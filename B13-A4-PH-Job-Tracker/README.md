Question : 1- What is the difference between getElementByid,getElementByClassName,and querySelector / querySelectorALL


Ans :
getElementById 
This is the most specific and fastest method. Since IDs must be unique in a valid HTML document , it only ever returns one single element.
-Syntax: document.getElementById(“my-id”) (note: no # needed).
-Returns: A single Element object or null.
-Best for : when you know exactly which unique element you need.
	
 getElementsByClassName
	This method looks for all elements sharing a specific class.
-Syntax : document.getElementByClassName(“my-class”)
-Returns: an HTML Collection.
-The “live” catch : This collection is live . if you add a new element with class vai javascript later, the collection updates automatically.
-Limitation : You cannot use  complex selectors (like “only buttons with this class”)

 querySelector & querySelectorAll
These are the most flexible "modern" methods. They use the same syntax you use in CSS.
                 -querySelector: Returns the first element that matches the criteria.
-querySelectorAll: Returns all elements that match.
-Returns: A NodeList. Unlike an HTMLCollection, a NodeList is static (it’s a snapshot in time) and allows you to use .forEach() directly.
-Best for: Complex queries (e.g., div > p.highlight).




Question : 2- How do you create and insert a new element into the DOM?


Ans :Create an element (createElement)
First, you create an "empty" element in the browser's memory using its tag name.

JavaScript
const newBox = document.createElement('div');

Configure the element
At this point, the element exists in the code but is empty and invisible. You need to give it content, a class, or an ID.
• Add text: newBox.textContent = "Hello World!";

• Add a class: newBox.classList.add('highlight-box');
• Set an attribute: newBox.setAttribute('id', 'unique-box');

Insert it into the DOM
Now you need to tell the browser exactly where to put this new element. To do this, you usually first find a "parent" element.
The classic way: appendChild()
This adds the new element as the last child of the parent.

JavaScript
const mainContainer = document.querySelector('#container');
mainContainer.appendChild(newBox);
Modern methods: append() and prepend()
• append(): Similar to appendChild, but allows you to append multiple items or even plain strings.
• prepend(): Adds the element as the first child (above).

JavaScript
mainContainer.prepend(newBox);

Placing it anywhere: insertAdjacentHTML() or insertAdjacentElement()
If you want to be very specific (e.g., "put this right before my logout button"), use these positions:
• 'beforebegin': Before the element.
• 'afterbegin': Inside the element, before its first child.
• 'beforeend': Inside the element, after its last child.
• 'afterend': After the element.

const target = document.queryselector('.target-btn'); target.insertadjacentelement('afterend', newbox);


Question : 3- What is Event Bubbling? And how does it work ?


Ans :In the DOM, when an event (such as a click) occurs on an element, it doesn't just stop there. It "bubbles" through its predecessors to the top of the document.

When you click on an element, the browser actually performs a three-step journey called the event propagation model:
Capturing phase: The event drops from the window to the target element.
Target phase: The event reaches the element you actually clicked on.
Bubbling phase: The event "bubbles" from the target element to the window. This is the phase we usually work with.
A practical example
Imagine you have a button inside a div.
HTML
<div id="parent" style="padding: 20px; background: red;">
<button id="child">Click Me!</button>
</div>
If you add a click listener to both the button and the div:
• You click the button.
• The button's alert pops up first.
• Then, the div's alert pops up automatically.

Even though you didn't click on the red background of the div, the click "bubbled up" from the button to its parent.

Why is this useful? (Event Delegation)
Bubbling allows for a powerful technique called event delegation. Instead of adding a listener to 100 different list items (<li>), you can simply add a listener to the parent (<ul>). When a <li> is clicked, the event bubbles up to the <ul>, where you can catch it.

 Stop bubbles
Sometimes bubbles cause problems (e.g., clicking a "Delete" button inside a card triggers the "Open Card" function). To prevent the event from going higher up the tree, use event.stopPropagation().
JavaScript
button.addEventListener('click', (event) => {
event.stopPropagation(); // The parent div will never know this happened!
console.log("Button clicked!");
});


Question : 4- What is Event Delegation in JavaScript ? Why is it useful?


Ans :Event delegation is a clever trick in JavaScript where instead of adding an event listener to each child element, you add a single listener to their parent.

This works because of event bubbling. When you click on a child element, the click "bubbles up" to where the parent's listener catches and handles it.
+1

How does it work?
Imagine you have a shopping list (<ul>) with 100 items (<li>). Instead of telling each item to watch for clicks, you tell the entire list: "Hey, if any of your children are clicked, let me know."

A practical code example:
Without delegation, you would have to loop through each li. With delegation, you do this:

JavaScript
const list = document.querySelector('#my-list');

list.addEventListener('click', (event) => {
// Check if the clicked item is actually 'LI'
if (event.target.tagName === 'LI') {
console.log('You clicked item: ' + event.target.textContent);
event.target.style.color = 'red';

}
});
Why is this useful? (Benefits)
Memory efficiency
Each event listener you add takes up some memory on the computer. If you have a table with 1,000 rows, adding 1,000 listeners can slow down the browser. A listener on a <table> is much "cheaper".

Dynamic element handling
This is the biggest advantage. If you add a new item to your list using JavaScript after the page loads, a normal listener will not work on the new item. But with delegation, the parent is already watching, so the new item works automatically!

Cleaner Code
You don't have to write complex loops or re-attach listeners every time you update HTML content. You can control everything with just one listener.
+1

Question : 5- What is the difference between preventDefaul() and stopPropagation methods?


Ans:Although both methods are used to "stop" something when an event occurs, they handle two completely different aspects of browser behavior.
In short: preventDefault() stops the browser's default action, while stopPropagation() stops the event from traveling up the DOM tree.

event.preventDefault()

Every HTML element has some default behavior built into the browser. This method tells the browser: "Don't do what you normally do."

• Common use cases: Stop submitting a form and refreshing the page, or stop a link (<a>) from opening a new URL.

• What it doesn't do: It doesn't stop the event from bubbling up to the parent element.

Example:

JavaScript
const link = document.querySelector('a');

link.addEventListener('click', (event) => {
event.preventDefault();
console.log("The link was clicked, but the page won't change!");

});

event.stopPropagation()
This method is related to event bubbling. It tells the browser: "Stop this event here. Don't let the parent elements know that it happened."
• Common use case: Prevent a button click inside a div from triggering a click event on that div.

• What it doesn't do: It doesn't stop the browser's default behavior (like a checkbox still being checked).

Example:

JavaScript
const button = document.querySelector('button');

const parentDiv = document.querySelector('div');

button.addEventListener('click', (event) => {
event.stopPropagation();
console.log("Only the button handler is running.");
});

parentDiv.addEventListener('click', () => {
console.log("This won't run because of stoppropagation.");
});
