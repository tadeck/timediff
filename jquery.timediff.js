/**
 * This script is freely available without charge and without warranty.
 * 
 * Author: T. Jaskowski
 * Site: https://github.com/tadeck
 * Version: 0.1
 */
(function ($, window) {
    'use strict';
    $.fn.timediff = function (options) {
        var data_interval_key = 'jquery-timediff-interval',
            clearInt = window.clearInterval,
            setInt = window.setInterval,
            abs = window.Math.abs,
            floor = window.Math.floor,
            opts;
        if (options === 'off') {
            // this call is meant to disable all the currently playing timediffs
            return this.each(function () {
                var interval = $(this).data(data_interval_key);
                if (interval) {
                    clearInt(interval);
                }
            });
        } else {
            // calculate options with defaults
            opts = $.extend({
                'attr': 'datetime',
                'description_calc': function (diff, timestamp_calc) {
                    var in_past = (diff >= 0);
                    return (in_past ? '' : 'in ') + timestamp_calc(diff) + (in_past ? ' ago' : '');
                },
                'interval': 1000,
                'timestamp_calc': function (diff) {
                    diff = abs(diff); // we do not care, if it is in the past
                    var result = [],
                        tmp_diff = floor(diff / 31536000); // 365 days
                    if (tmp_diff) {
                        result.push(tmp_diff + ' year' + (tmp_diff !== 1 ? 's' : ''));
                        diff -= tmp_diff * 31536000;
                    }
                    tmp_diff = floor(diff / 2592000); // 30 days
                    if (tmp_diff) {
                        result.push(tmp_diff + ' month' + (tmp_diff !== 1 ? 's' : ''));
                        diff -= tmp_diff * 2592000;
                    }
                    tmp_diff = floor(diff / 86400);
                    if (tmp_diff) {
                        result.push(tmp_diff + ' day' + (tmp_diff !== 1 ? 's' : ''));
                        diff -= tmp_diff * 86400;
                    }
                    tmp_diff = floor(diff / 3600);
                    if (tmp_diff) {
                        result.push(tmp_diff + ' hour' + (tmp_diff !== 1 ? 's' : ''));
                        diff -= tmp_diff * 3600;
                    }
                    tmp_diff = floor(diff / 60);
                    if (tmp_diff) {
                        result.push(tmp_diff + ' minute' + (tmp_diff !== 1 ? 's' : ''));
                        diff -= tmp_diff * 60;
                    }
                    if (diff) {
                        // seconds left
                        result.push(diff + ' second' + (diff !== 1 ? 's' : ''));
                    }
                    return result.join(' ');
                }
            }, options);

            return this.each(function () {
                var el = $(this),
                    time_base = new Date(el.attr(opts.attr)),
                    update_time = function () {
                        el.text(opts.description_calc(floor(((new Date()) - time_base) / 1000), opts.timestamp_calc));
                    },
                    interval;
                update_time(); // first call - do not wait for interval
                interval = setInt(update_time, opts.interval);
                el.data(data_interval_key, interval); // save interval ID
            });
        }
    };
}(jQuery, window));