(function () {
  'use strict';

  document.querySelectorAll('[data-decision-guide]').forEach(function (guide) {
    var buttons = guide.querySelectorAll('[data-result]');
    var results = guide.querySelectorAll('.decision-result');

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var target = document.getElementById(button.getAttribute('data-result'));
        buttons.forEach(function (item) { item.setAttribute('aria-pressed', 'false'); });
        results.forEach(function (result) { result.classList.remove('is-visible'); });
        button.setAttribute('aria-pressed', 'true');
        if (target) {
          target.classList.add('is-visible');
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  });
}());
