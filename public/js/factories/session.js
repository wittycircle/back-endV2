/**
 * Created by rdantzer on 22/06/16.
 */

(function () {
    'use strict';

    angular.module('fspork').service('Session', function () {
        this.create = function (token, user) {
            this.token = token;
            this._id = user.id;
            this._profile_id = user.profile_id;
            this._email = user.email;
        };

        this.destroy = function () {
            this.token = null;
            this._id = null;
        };

        this.get = function () {
            return this;
        };

        this.getId = function () {
            return this._id;
        }
    });

})();