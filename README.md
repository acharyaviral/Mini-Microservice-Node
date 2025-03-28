<h1>Microservices Architecture Project</h1>

<p>This repository contains a simple microservices-based application built with <strong>Node.js</strong>, <strong>Express</strong>, and <strong>React</strong>. The architecture is designed with independent services that communicate via a simple manual event bus, ensuring seamless data flow between them.</p>

<h2>Features</h2>
<ul>
  <li><strong>Create Post</strong>: Users can create new posts.</li>
  <li><strong>Retrieve Posts</strong>: Fetches all existing posts.</li>
  <li><strong>Create Comment</strong>: Adds a comment to a specific post.</li>
  <li><strong>Retrieve Comments</strong>: Retrieves comments associated with a post.</li>
  <li><strong>Event Bus</strong>: Facilitates communication between microservices using a manual event-driven approach.</li>
</ul>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Frontend</strong>: React.js</li>
  <li><strong>Backend</strong>: Node.js, Express.js</li>
  <li><strong>Communication</strong>: Custom manual event bus</li>
</ul>

<h2>Architecture Overview</h2>
<p>This project follows a microservices architecture, where each service is independent and communicates asynchronously through an event-driven model.</p>

<h3>Services</h3>
<ol>
  <li><strong>Posts Service</strong>: Handles post creation and retrieval.</li>
  <li><strong>Comments Service</strong>: Manages comments related to posts.</li>
  <li><strong>Event Bus</strong>: Ensures inter-service communication by propagating events.</li>
  <li><strong>Client (Frontend)</strong>: React-based user interface for interacting with the services.</li>
</ol>

<h2>Setup & Installation</h2>

<h3>Prerequisites</h3>
<p>Ensure you have the following installed:</p>
<ul>
  <li><strong>Node.js</strong> (latest LTS version)</li>
  <li><strong>npm</strong> or <strong>yarn</strong></li>
</ul>

<h3>Steps to Run the Project</h3>
<ol>
  <li>Clone the repository:
    <pre><code>git clone &lt;repository-url&gt;
cd &lt;project-folder&gt;</code></pre>
  </li>
  <li>Install dependencies for each service:
    <pre><code>npm install</code></pre>
  </li>
  <li>Start each service:
    <pre><code>npm start</code></pre>
  </li>
  <li>Start the event bus:
    <pre><code>node event-bus.js</code></pre>
  </li>
  <li>Start the frontend application:
    <pre><code>cd client
npm start</code></pre>
  </li>
  <li>Open the browser and navigate to <code>http://localhost:3000</code>.</li>
</ol>






