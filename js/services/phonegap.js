'use strict';

/* Services */

angular.module('App.services')

.factory('PhonegapReady', function() {
    return function (fn) {
        var queue = [];
        var impl = function () {
            queue.push(Array.prototype.slice.call(arguments));
        };

        document.addEventListener('deviceready', function () {
            queue.forEach(function (args) {
                fn.apply(this, args);
            });
            impl = fn;
        }, false);

        return function () {
            return impl.apply(this, arguments);
        };
    };
})



.factory('Geolocation', function ($rootScope, PhonegapReady) {
    return {
        getCurrentPosition: function (onSuccess, onError, options) {
            navigator.geolocation.getCurrentPosition(function () {
                var that = this,
                args = arguments;

                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                args = arguments;

                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            },
            options);
        }
    };
})



.factory('Accelerometer', function ($rootScope, PhonegapReady) {
    return {
        getCurrentAcceleration: PhonegapReady(function (onSuccess, onError) {
            navigator.accelerometer.getCurrentAcceleration(function () {
                var that = this,
                args = arguments;

                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                args = arguments;

                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            });
        })
    };
})



.factory('Notification', function ($rootScope, PhonegapReady) {
    return {
        alert: PhonegapReady(function (message, alertCallback, title, buttonName) {
            navigator.notification.alert(message, function () {
                var that = this,
                args = arguments;

                $rootScope.$apply(function () {
                    alertCallback.apply(that, args);
                });
            }, title, buttonName);
        }),
        confirm: PhonegapReady(function (message, confirmCallback, title, buttonLabels) {
            navigator.notification.alert(message, function () {
                var that = this,
                args = arguments;

                $rootScope.$apply(function () {
                    alertCallback.apply(that, args);
                });
            }, title, buttonName);
        }),
        beep: function (times) {
            navigator.notification.beep(times);
        },
        vibrate: function (milliseconds) {
            navigator.notification.vibrate(milliseconds);
        }
    };
})



.factory('Navigation', ["$navigate", "$location", function($navigate, $location) {
    return {
        slidePage: function (path,type) {
            $navigate.go(path,type);
        },
        back: function () {
            $navigate.back();
        }
    }
}])



.factory('Compass', function ($rootScope, PhonegapReady) {
    return {
        getCurrentHeading: PhonegapReady(function (onSuccess, onError) {
            navigator.compass.getCurrentHeading(function () {
                var that = this,
                args = arguments;

                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                args = arguments;

                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            });
        })
    };
})



.factory('Contacts', function ($rootScope, PhonegapReady) {
    return {
        findContacts: PhonegapReady(function (onSuccess, onError) {
            var options = new ContactFindOptions();
            options.filter="";
            options.multiple=true;
            var fields = ["displayName", "name"];
            navigator.contacts.find(fields, function(r){console.log("Success" +r.length);var that = this,
                args = arguments;
                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }
            }, function () {
                var that = this,
                args = arguments;

                if (onError) {
                    $rootScope.$apply(function () {
                        onError.apply(that, args);
                    });
                }
            }, options)
        })
    }
})



