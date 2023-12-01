# CSS inteview Preparation  

**1) What is the Box model in CSS? Which CSS properties are a part of it?**
```
Each element on a web page can be seen as a rectangular box, and the box model describes how these boxes are structured.
It defines the structure of an HTML element in terms of content, padding, border, and margin.

Content:  Actual Content of the box where the text or image is placed.
Padding: Area surrounding the content (Space between the border and content).
Border: Area surrounding the padding.
Margin: Area surrounding the border.
```
***
**2) What are the advantages of using CSS?**
```
Each element on a web page can be seen as a rectangular box, and the box model describes how these boxes are structured.
It defines the structure of an HTML element in terms of content, padding, border, and margin.

Content:  Actual Content of the box where the text or image is placed.
Padding: Area surrounding the content (Space between the border and content).
Border: Area surrounding the padding.
Margin: Area surrounding the border.
```
***

**3) How to include CSS in the webpage?**
```
1 - External Style Sheet: An external file linked to your HTML document: Using link tag, we can link the style sheet to the HTML page.

<link rel="stylesheet" type="text/css" href="mystyles.css" />

2 - Embed CSS with a style tag: A set of CSS styles included within your HTML page.

<style type="text/css">

/*Add style rules here*/

</style>
Add your CSS rules between the opening and closing style tags and write your CSS exactly the same way as you do in stand-alone stylesheet files.

3 - Add inline styles to HTML elements(CSS rules applied directly within an HTML tag.): Style can be added directly to the HTML element using a style tag.
<h2 style="color:red;background:black">Inline Style</h2>

4 - Import a stylesheet file (An external file imported into another CSS file): Another way to add CSS is by using the @import rule. This is to add a new CSS file within CSS itself.

@import "path/to/style.css";
```

**3) 5. What are the different types of Selectors in CSS?**
```
Universal Selector - The universal selector works like a wildcard character, selecting all elements on a page.
* {
  color: "green";
}

Element Type Selector - This selector matches one or more HTML elements of the same name.
ul {
  line-style: none;
  border: solid 1px #ccc;
}

ID Selector - This selector matches any HTML element that has an ID attribute with the same value as that of the selector.

#container {
  width: 960px;
  margin: 0 auto;
}
<div id="container"></div>

Class Selector - The class selector also matches all elements on the page that have their class attribute set to the same value as the class.

.box {
  padding: 10px;
  margin: 10px;
  width: 240px;
}
<div class="box"></div>

Attribute Selector - The attribute selector targets elements based on the presence and/or value of HTML attributes, and is declared using square brackets.

input [type=”text”] {
	background-color: #444;
	width: 200px;
}
<input type="text" />

Descendant Combinator - The descendant selector or, more accurately, the descendant combinator lets you combine two or more selectors so you can be more specific in your selection method.
#container .box {
	float: left;
	padding-bottom: 15px;
} 

Child Combinator - A selector that uses the child combinator is similar to a selector that uses a descendant combinator, except it only targets immediate child elements.

#container> .box {
	float: left;
	padding-bottom: 15px;
}
<div id="container">
	<div class="box"></div>
</div>	

General Sibling Combinator - A selector that uses a general sibling combinator to match elements based on sibling relationships.

h2 ~ p {
	margin-bottom: 20px;
}

<h2>Title</h2>
<p>Paragraph example.</p>

Adjacent Sibling Combinator -  A selector that uses the adjacent sibling combinator uses the plus symbol (+), and is almost the same as the general sibling selector. The difference is that the targeted element must be an immediate sibling, not just a general sibling.

p + p {
	text-indent: 1.Sem;
	margin-bottom: 0;
}
```
***
**4)What is a CSS Preprocessor?**
```
A CSS Preprocessor is a tool used to extend the basic functionality of default vanilla CSS through its own scripting language.
 It helps us to use complex logical syntax like – variables, functions, mixins, code nesting, and inheritance to name a few, supercharging your vanilla CSS.
```
***
**5) What is VH/VW ?
```
It’s a CSS unit used to measure the height and width in percentage with respect to the viewport. It is used mainly in responsive design techniques
```
***

**6) Difference between reset vs normalize CSS?. How do they differ?**
```
Reset CSS: CSS resets aim to remove all built-in browser styling. For example margins, paddings, font-sizes of all elements are reset to be the same.
* {
    margin: 0;
    padding: 0;
    border: 0;
    /* Other reset styles go here */
}

Normalize CSS: Normalize CSS aims to make built-in browser styling consistent across browsers. It also corrects bugs for common browser dependencies.

Preserve default useful browsers instead of erasing them.
Standardize styles for a wide variety of HTML elements.
```
***
**7)What is the difference between inline, inline-block, and block?**
```
Block Element: The block elements always start on a new line. They will also take space for an entire row or width. List of block elements are <div>, <p>.

Inline Elements: Inline elements don't start on a new line, they appear on the same line as the content and tags beside them. Some examples of inline elements are <a>, <span> , <strong>, and <img> tags. 
margin-top or margin-bottom doen't have an effect on inline elements

Inline Block Elements: Inline-block elements are similar to inline elements, except they can have padding and margins and set height and width values.
```
***

**8) What are Pseudo elements and Pseudo classes?**
```
Pseudo-elements:  A CSS pseudo-element is used to style specified parts of an element.
For example, it can be used to:
Style the first letter, or line, of an element

p::first-line {
  color: #ff0000;
  font-variant: small-caps;
}

Pseudo-classes: select regular elements but under certain conditions like when the user is hovering over the link.
for example :link :visited :hover :focus
```
***

**9) How is border-box different from content-box?**
```
content-box and border-box refer to different CSS box-sizing models, which determine how the width and height of an element are calculated.

content-box gives you the default CSS box-sizing behavior. If you set an element's width to 100 pixels, then the element's content box will be 100 pixels wide, and the width of any border or padding will be added to the final rendered width, making the element wider than 100px.

border-box:  If you set an element's width to 100 pixels, that 100 pixels will include any border or padding you added, and the content box will shrink to absorb that extra width.
```
***

**10) z-index**
```
It specifies the vertical stack order of the elements positioned that helps to define how the display of elements should happen in cases of overlapping.
```
***

**11) Flexbox**
```
Flexbox --> Flexible Box Layout, is a layout model in CSS that allows you to design complex layouts and distribute space and align content in a more efficient way.
It provides an easier and cleaner way to align items and distribute space within a container.
```
***

**12) cascading**
```
Cascading  --> styling rules that help the browser to select what rules have to be applied in times of conflict.

p { color:white; }
p { color: black; }
Here, the browser just cascades down to identify what is the most recent and most specific style and applies that.
 if we want to ensure color white is applied to the paragraph, we can define weight to that style by adding !important.
 p { color:white !important; }
```
***

**13)CSS position**
```
The position property in CSS determines how an element is positioned within its parent or containing element.

1) Static - The default value

2) Relative - 
The element is positioned relative to its normal position in the document flow.
Setting top, right, bottom, or left properties will move the element from its normal position.

3) Fixed - The element is positioned relative to the viewport (the browser window), so it will stay fixed even when the page is scrolled.

4) Absolute - The element is positioned absolute to its nearest positioned ancestor (instead of positioned relative to the viewport, like fixed).
Setting top, right, bottom, or left properties will position the element relative to its containing element.

5) Sticky - The element is treated as relative positioned until it reaches a specified point, then it is treated as fixed positioned.
It's a hybrid of relative and fixed positioning.
.element {
    position: sticky;
    top: 50px; /* This specifies the point where the element becomes fixed */
}
```
***

**14) Difference between CSS grid vs flexbox?**
```
CSS Grid Layout is a two-dimensional system, meaning it can handle both columns and rows. Grid layout is intended for larger-scale layouts which aren’t linear in design.
Flexbox is largely a one-dimensional system (either in a column or a row). Flexbox layout is most appropriate to the components of an application.
```
***

* Q) specificity in css
* Q) Grid ?

**15) How will you fix browser-specific styling issues?**
```
*) At Initial stage use normalize.css -  establish a consistent baseline for all browsers by overriding
their default styles
*) Add vendor prefixes - Many CSS properties require vendor prefixes to work across different browsers.
-webkit-   -moz-  -o- -ms-
*) Targeting Specific Browser Features or Versions with Media Queries.
/* Style for Firefox only */
@media (-moz-appearance: button) {
  .button {
    background-color: #ff9800;
    border: 1px solid #000;
  }
}
*) 
```
***
