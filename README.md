# addField is a jQuery plugin that add multiple fields

Facing the problem of adding multiple filds dinamically in a form if requested by the specs, I have created this plugin.

In this repo you can find 3 example because I have used Mustache.js library to help myself creating a template of the fileds that I needed.

## First example

In the first example (in this file "addFields-using-only-jquery.html") I used jQuery in the document ready for who want a simple solution of this problem (the js file is "addField.js").

Note that you have to change the js file to catch your own classes.

## Second example

In the second example (in this file "addFields-using-Mustache-lib.html" that import this js file "addField-Mustache.js") I show you how to use Mustache.js to solve the problem of adding multiple fields in a form dinamically.

Once you have done the JS, you don't have to touch it anymore. If something is changing on the layout you have only to change the template that is in the HTML file.

## Third example

In the third example ("addFields-using-plugin-jquery.addField-and-Mustache-lib" that uses the js file "jquery.addField.js") there is the plugin in action.

To work with it simply apply it to the form where there will be the multiple fields and create a container for the "Add" button (or link).

The "Remove" button is placed inside the templete even in the previous examples, because for each of them is created an unique event that remove only one specified filed (or a row of fields).

I leave both the solutions seen before with or without the Mustache.js:

* If you want to use both Mustache.js and the plugin simple leave it how is it now

* If you want to use only the plugin you have to uncomment all the append function on the wrapper in the plugin file

```
$wrapper.append({
	...
});
```

and you can delete the script with the template in the HTML file

```
<script id="addFieldTemplate" type="x-tmpl-mustache">
	...
</script>
```

---------

##NOTE##

Mustache.js is a very useful library that implements the mustache template system in JavaScript. Follow [the owner GitHub link for further details](https://github.com/janl/mustache.js/)
