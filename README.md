Nuclear Button for Twitter Bootstrap
====================================
Nuclear Button is a simple script that transforms a simple Bootstrap button in a special button, that requires user to click a second time to perform the action required.
It's useful if you don't want to use annoying pop-up dialogs that nobody will ever read after their first appearance.

After the first click, nuclear button will change its state to *armed*, it will become red, its text will change (if you want), and it will be ready for a final click.
You can optionally set a delay, which will show a countdown before enabling the *armed* state.

How to use
----------
You need to include jQuery, Twitter Bootstrap and nuclear.js
```html
<link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/nuclear.js"></script>
```

Then just select your `.btn` and call Nuclear.

```javascript
$('#my-awesome-button').nuclear({
  alertText: 'Proceed launching nuclear',
  onClick: function () {
    alert('boom boom!');
  },
  useOnce: true,
  delay: 3
});
```

Parameters
----------
- **alertText**

  (optional) the string that will substitute button's title after first click
- **onClick**

  this function starts on the second click
- **useOnce**

  (optional) boolean, if set to true, button will be disabled after the second click
- **delay**

  (optional) set number of seconds to wait before enabling armed button after the first click. It avoids the risk of an instinctive second click