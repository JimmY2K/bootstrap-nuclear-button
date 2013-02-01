Nuclear Button for Twitter Bootstrap
====================================
Nuclear Button is a simple script that transforms a simple Bootstrap button in a special button, that requires the user to click a second time to perform the action required.

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
  useOnce: true
});
```

Parameters
----------
- **alertText**

  (optional) the string that will substitute button's title after first click
- **onClick**

  function run on the second click
- **useOnce**

  (optional) boolean, if true button will be disabled after the second click
