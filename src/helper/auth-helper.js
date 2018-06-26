
import { WebServiceRoot, STORE_AUTH, STORE_ADMIN } from "../config/app-config";
import { getUnixTimestampNow } from "./time-helper";

const KEY = STORE_AUTH;

/*
authenticated: false,
login_time: unixtimestamp
user: null,
err: "[Server Error] " + err
*/

var STORE = {};

function initStorage() {
    STORE = localStorage.getItem(KEY);
    if (STORE !== null) {
        try {
            STORE = JSON.parse(STORE);
        } catch (err) {
            resetStorage();
        }
    } else {
        resetStorage();
    }
}

function resetStorage() {
    STORE = {};
    localStorage.setItem(KEY, "{}");
}

initStorage();

// #######################################################
// Auth helper class
export const AuthErr = {
    INVALID_USER: "INVALID_USER",
    WRONG_PASSWORD: "WRONG_PASSWORD",
    INVALID_MACHINE_NO: "INVALID_MACHINE_NO",
    NO_NEW_VERSION: "ERR_NO_NEW_VERSION"
};

export const AuthHelper = {
    loginWithUser(user_id, pc_id, cb) {
        cb = arguments[arguments.length - 1];
        if (this.loggedIn()) {
            if (cb) cb(this.getStore());
            return;
        }

        loginRequestUser(user_id, pc_id, (res) => {
            if (res.authenticated) {
                localStorage.setItem(KEY, JSON.stringify(res));
            }

            // reinitialize storage
            initStorage();

            if (cb) cb(res);
        })
    },
    getStore() {
        try {
            return JSON.parse(localStorage.getItem(KEY));
        } catch (err) {
            console.log("error in getStore", err);
            return {};
        }
    },
    getUser() {
        var user = this.getStore().user;
        if (typeof user === "undefined") {
            return {};
        } else {
            return user;
        }
    },
    logout(cb, makeRequest) {
        makeRequest = (typeof makeRequest === "undefined") ? true : makeRequest;

        if (makeRequest) {
            var user = this.getUser();
            if (typeof user !== "undefined") {
                logoutRequest(user["OPER_ID"]);
            }
        }

        // remove user local storage
        localStorage.removeItem(KEY);
        localStorage.removeItem(STORE_ADMIN);

        // reinitialize storage
        initStorage();

        if (cb) cb();
    },
    isSessionExpired(store) {
        if (typeof store === "undefined") {
            store = this.getStore();
        }

        // session will expired after 16 hour from login time
        var LIMIT_HOUR = 10;
        var LIMIT_UNIX = LIMIT_HOUR * 60 * 60;
        //console.log("checking isSessionExpired", store.login_time + LIMIT_UNIX, getUnixTimestampNow());

        // if last login time plus session limit hour is less than current time
        // then session already expired
        if (store.login_time + LIMIT_UNIX < getUnixTimestampNow()) {
            console.log("Session Expired");
            return true;
        }

        return false;
    },
    loggedIn(goToExit) {
        var store = this.getStore();
        var authed = false;

        if (store.authenticated) {
            authed = true;

            // make request to db to check if 
            // login time in DB is same stored in local
            checkLoginTimeRequest(store.user["OPER_ID"], res => {
                try {
                    res = JSON.parse(res);
                    var login_time = res.data[0]["LOGIN_TIME"];

                    //console.log("local", store.login_time);
                    //console.log("db", login_time);

                    // if overrided by another PC no need to make logout request to server
                    if (store.login_time != login_time) {
                        this.logout(goToExit, false);
                    }
                    // if okay check if session expired
                    else if (this.isSessionExpired(store)) {
                        this.logout(goToExit);
                    }

                } catch (err) {
                    console.log("err parse");
                    this.logout(goToExit);
                }
            });

        }

        return authed;
    },
}