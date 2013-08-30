========================================
timediff plugin version 0.1.1 for jQuery
========================================

Original source: https://github.com/tadeck/timediff

Demonstration is available `here <http://tadeck.github.com/timediff>`_.

What is jQuery timediff?
========================

jQuery ``timediff`` is a plugin for jQuery JavaScript framework, aimed at
flexible and dynamic generation of relative timestamps based on absolute
timestamps.

Default configuration is to update the content of the tag with timestamp
relative between current time on the browser and timestamp saved as
``datetime`` attribute of the tag (as in case of HTML5's ``<time>`` tag). The
attribute however can be changed, as some other options, allowing for
customization (see options section).

**Feel free to fork it and make it better!**

The source of the plugin has been passed by `Douglas Crowford's JSLint
<http://www.jslint.com/>`_ and minified using `JSCompress.com
<http://jscompress.com/>`_.

How it works?
=============

The plugin requires jQuery JavaScript framework to work. The plugin creates
separate intervals for each tag, allowing for stopping only selected timediff
intervals like that::

    $('time').timediff(); // start timediff for every <time> tag
    $('time').on('click', function(){
        $(this).timediff('off'); // disable timediff for clicked <time> tag
    });

Example for HTML5's ``<time>`` tag
----------------------------------

If you are using HTML5's ``<time>`` tag with ISO-8601 compliant ``datetime``
attribute, the plugin can be applied directly on it and will replace content of
the tag with relative timestamp based on ``datetime`` attribute. So, for
example ``<time datetime="2013-06-01T12:00:00Z">noon UTC at June 1st,
2013</time>`` will be displayed dynamically (at 11:50:20 UTC, June 1st, 2013,
it will look like "*in 9 minutes 40 seconds*").

How to use it?
==============

To use it, you can simply call it like that::

    $(your_selector).timediff();

where ``your_selector`` is a selector for timestamp tags.

You can also disable working ``timediff`` stamps by doing this::

    $(your_selector).timediff('off');

(same notice about ``your_selector`` applies).

You can also pass some options to ``timediff`` plugin like that::

    $(your_selector).timediff(options);

where ``options`` is an object containing options you want to set (described
below).

Options you can set
===================

The following options can provided to ``timediff`` plugin:

- ``attr`` - name of the attribute that is used to determine the absolute
  timestamp we calculate difference to. The default ``datetime`` (as in
  ``<time>`` HTML5's tag) is used.
- ``description_calc`` - function used to calculate the description of the tag
  like "*[descriptive_timestamp] ago*" or "*in [descriptive_timestamp]*" (for
  calculating actual timestamp ``[descriptive_timestamp]`` you should use
  second parameter, callback). Parameters passed to it are in the following
  order: 1) time difference in seconds (negative if timestamp is in future),
  2) callback to calculate descriptive time difference (like "*10 minutes 15
  seconds*").
- ``interval`` - interval of timestamp updates in miliseconds (default is
  ``1000``),
- ``timestamp_calc`` - function used to calculate the relative timestamp,
  should return descriptive difference like "*10 minutes 15 seconds*". The
  first parameter to it contains difference in seconds (may be negative if the
  timestamp is in the future, so make sure to take absolute value of it).

Changelog
=========

+---------+------------+------------------------------------------------------+
| Version | Released   | Changes                                              |
+=========+============+======================================================+
| 0.1.1   | 2013-04-06 | - initial release supporting jQuery Plugins index,   |
+---------+------------+------------------------------------------------------+

License
=======

Default license is MIT, available at:
https://github.com/tadeck/timediff/blob/master/LICENSE.rst

If you need additional license, please add appropriate ticket in the issue
tracking system: https://github.com/tadeck/timediff/issues
