const sequelize = require("../config/connection");
const { Post } = require("../models");

const postData = [
	{
		post_title: "Have you ever used 'Document.referrer'?",
		post_content: `MDN says this: 
    
    "The Document.referrer property returns the URI of the page that linked to this page.

    The value is an empty string if the user navigated to the page directly (not through a link, but, for example, by using a bookmark). Because this property returns only a string, it doesn't give you document object model (DOM) access to the referring page."

This means you have an easy way of returning the user to the previous page they were on, without needing to hard code the previous page's url! What if the previous page had a value in its URL that you couldn't grab for some reason? Use Document.referrer!`,
		user_id: 1
	},
	{
		post_title: "CSS animations can add so much fun to your website",
		post_content: `Do you know what CSS animations are? If you don't, have a read of this (taken from MDN):
    
    "CSS animations make it possible to animate transitions from one CSS style configuration to another. Animations consist of two components, a style describing the CSS animation and a set of keyframes that indicate the start and end states of the animation's style, as well as possible intermediate waypoints.

    There are three key advantages to CSS animations over traditional script-driven animation techniques:
    
    1. They're easy to use for simple animations; you can create them without even having to know JavaScript.
    2. The animations run well, even under moderate system load. Simple animations can often perform poorly in JavaScript. The rendering engine can use frame-skipping and other techniques to keep the performance as smooth as possible.
    3. Letting the browser control the animation sequence lets the browser optimize performance and efficiency by, for example, reducing the update frequency of animations running in tabs that aren't currently visible."
    
Neat, right? I bet this would make a website look really dynamic and interesting, but as web designers, we have to remember not to go overboard.`,
		user_id: 1
	},
	{
		post_title: "What is Object Oriented Programming (OOP)?",
		post_content: `If you didn't know, check this summary from Tech Target: 
    
    "Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior."
    
    I wonder if there are other programming paradigms out there?`,
		user_id: 2
	},
	{
		post_title: "The difference between Software Engineers and IT Support",
		post_content: `The other day I got to thinking aren't Software Engineers and IT Support kind of the same? I came across this from Nodeflair, which provides a nice summary:
    
    "A software engineer understands design, implementation, and management of software information systems and hardware processes. Whereas, an IT support engineer works on installation, development, and implementation of computer systems and applications."
    
What are your thoughts? We all deal with the same kind of thing, don't we?`,
		user_id: 3
	}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
