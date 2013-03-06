/* ============================================================
 * Nuclear Button 1.1 for Bootstrap by Twitter
 * ============================================================
 * Copyright (C) 2013 Federico Parodi <federico.parodi@welaika.com>

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function ($) {

  var NuclearButton = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, options)
    this.options.originalTitle = this.$element.html()
    this.state = NuclearButton.prototype.STATES.SECURE;
    this.originalWidth = ""
    this.originalHeight = ""
    if (typeof this.options.onClick=='undefined')
      this.options.onClick = function () {
        return false;
      }
  }

  NuclearButton.prototype.STATES = {
    SECURE: 1,
    ARMED: 2
  }

  NuclearButton.prototype.setTitle = function(title) {
    this.$element.html(title);
  }

  NuclearButton.prototype.isSecure = function() {
    return (this.state == NuclearButton.prototype.STATES.SECURE)
  };

  NuclearButton.prototype.isArmed = function() {
    return (this.state == NuclearButton.prototype.STATES.ARMED)
  };

  NuclearButton.prototype.arm = function() {
    this.state = NuclearButton.prototype.STATES.ARMED;
    if (this.options.alertText) {
      _this = this;
      clone = this.$element.clone();
      clone.html(this.options.alertText);
      clone.hide()
      this.$element.after(clone)
      var newWidth = clone.css('width');
      clone.remove();
      this.$element.html('');
      this.$element.css('width', this.originalWidth);
      this.$element.css('height', this.originalHeight); 
      this.$element.animate(
        {
          width: newWidth,
        }, 200, function() {
          _this.$element.addClass("btn-danger");

          if (_this.options.delay > 0) { 
            _this.$element.addClass('disabled');
            _this.refreshTimerAt(_this.options.delay);
          }
          else {
            _this.setTitle(_this.options.alertText);
            _this.$element.css('width','');
          }
        }
      );
    }
    else 
      this.$element.addClass("btn-danger");
  };

NuclearButton.prototype.refreshTimerAt = function(seconds) {
  _this = this;
  this.setTitle(seconds);
  if (seconds > 0) this.timerTimeout = window.setTimeout(function() {_this.refreshTimerAt(seconds - 1);},1000);
  else {
    this.setTitle(_this.options.alertText);
    this.$element.css('width','');
    this.$element.removeClass('disabled');
  }
}

NuclearButton.prototype.disarm = function() {
    this.state = NuclearButton.prototype.STATES.SECURE;
    if (this.options.alertText) {
      _this = this;
      var alertWidth = this.$element.css('width');
      this.$element.html('');
      this.$element.css('width', alertWidth);
      this.$element.css('height', this.originalHeight);
      this.$element.animate(
        {
          width: this.originalWidth
        }, 200, function() {
          $(this).data('nuclear').setTitle($(this).data('nuclear').options.originalTitle);
          $(this).removeClass("btn-danger");
          $(this).css('width','');
        });
    }
    else 
      this.$element.removeClass("btn-danger");
  };

  NuclearButton.prototype.runUserEvent = function () {
    return this.options.onClick();
  }

  NuclearButton.prototype.reset = function () {
    this.disarm();
    if (this.options.useOnce) {
      this.$element.addClass('disabled');
    }
  }
  
  NuclearButton.prototype.disarmAll = function () {
    $('[data-nuclear-button^=nuclear]').each(function() {
      if ($(this).data('nuclear').isArmed()) {
        window.clearTimeout($(this).data('nuclear').timerTimeout);
        $(this).removeClass('disabled');
        $(this).data('nuclear').disarm();
      }
    });
  }

  var old = $.fn.nuclear

  $.fn.nuclear = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('nuclear')
        , options = typeof option == 'object' && option
      if ($this.hasClass('btn') == false) return true 
      if (!data) $this.data('nuclear', (data = new NuclearButton(this, options ? option : null)))
      $this.attr('data-nuclear-button','nuclear');
      $this.data('nuclear').originalWidth = $this.css('width');
      $this.data('nuclear').originalHeight = $this.css('height');
    })
  }

  $.fn.nuclear.Constructor = NuclearButton

  $.fn.nuclear.noConflict = function () {
    $.fn.nuclear = old
    return this
  }

  $(document).on('click.nuclear', '[data-nuclear-button^=nuclear]', function (e) {
    if ($(e.target).hasClass('disabled')) return false;

    NuclearButton.prototype.disarmAll();

    var nuclearButton = $(e.target).data('nuclear')

    if (nuclearButton.isSecure()) 
      nuclearButton.arm();
    else if (nuclearButton.isArmed()) {
      nuclearButton.runUserEvent();
      nuclearButton.reset();
    }

    return false;
  })

  $(document).on('click.nuclear', '[data-nuclear-button!=nuclear]', function (e) {
    NuclearButton.prototype.disarmAll();
  })
}(window.jQuery);