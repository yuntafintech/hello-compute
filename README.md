# Oh hi Compute!

This is an app for learning about edge computing with Fastly!

In this project you'll learn how to enhance the behavior of a website at the network edge using logic written in JavaScript. You can test the functionality locally in the codespace without installing any local tooling, then grab a Fastly API key when you're ready to deploy.

## In this doc

* [Fork your own app](#fork-your-own-app)
* [Get to know your app](#get-to-know-your-app)
  * [Make a change](#make-a-change)
  * [Share your draft app](#share-your-draft-app)
* [Deploy your app to Fastly Compute](#deploy-your-app-to-fastly-compute)
* [Save your edits to GitHub](#save-your-edits-to-github)
* [How this project works](#how-this-project-works)
  * [Extensions](#extensions)
* [Keep going! 🚀](#keep-going-)

## Fork your own app

**Fork** [this repository](https://github.com/glitchdotcom/hello-compute/) to create your own copy of the app.

In your fork, open the site in a codespace by clicking **Code** > **Codespaces** and creating a new codespace on your main branch. 

<img alt="Create codespace" src="https://github.com/user-attachments/assets/cb29a8da-d1ac-42f5-962c-7d43b8011324" width="400px"/><br/>

Give the codespace a minute or two to start up – it'll automatically build and preview your new app! 

> 🌎 🤔 Note that the geolocation information will be based on your request from inside the Codespace container (so it'll likely indicate that your request is coming from the US even if you're somewhere else). When you publish to Fastly and view your `edgecompute.app` address, you should see more relevant location info.

## Get to know your app

This starter kit changes the behavior of a website at the edge. Check out the <a href="https://glitchdotcom.github.io/compute-origin" target="_blank">origin version of the site</a>.

In your codespace preview:

* Try opening a page that doesn't exist: `/ohno`
* Now try a page that the origin returns as JSON: `/data.json`

![app in codespace](https://github.com/user-attachments/assets/77d9c974-edaa-4053-88fd-84c36707607e)

* When your website preview opens, click the **🔎 Split** button at the bottom so that you can see the site side by side with your code.
* _You can close [x] the **Terminal** while you work._

You can view the origin version of the site in the codespace too by opening the **💻 Terminal**, selecting **Ports** and clicking the little preview button next to the `Origin` listing:

![origin site open](https://github.com/user-attachments/assets/cc768d28-458f-4ab8-b772-f88d7db51603)

> ⚠️ _If you're using your own origin website and want to view it in the codespace, change the code in `origin/index.html` to point the `iframe` `src` attribute to your site._

Explore the code:

* Your `fastly.toml` file includes the service config
* The `src/index.js` file includes the application logic

The functionality:

* The app changes the stylesheet from `style.css` to `edge.css`
* It grabs geolocation info about the request (this won't work reliably on the local server, read on to deploy to the Fastly network)
* It also adds a cookie to the response (the origin website writes it into the page)
* If the request is for a `json` file, we send the data back in a synthetic HTML page
* We send synthetic pages back for any 404 or 500 errors

### Make a change

Make a change to the `index.js` code!

Find the line where the code sets the value of the `geo` variable using `getGeolocationForIpAddress` and add the following on the next line:

```js
// Let's get the time of day and find out how far from UTC it is
let displayTime = new Date().getHours();
let offset = geo.utc_offset;
displayTime += offset / 100;

// Tailor the greeting to the user time of day
greeting =
  displayTime > 4 && displayTime < 12
    ? "Morning! "
    : displayTime >= 12 && displayTime < 18
    ? "Afternoon! "
    : "Evening! ";
```

The code changes the greeting to reflect the time of day at the user location.

The Fastly CLI will automatically rebuild and run the app – you'll see the effects in the preview.

### Share your draft app 

You can share links to your draft app with collaborators – click **🔗 Share** at the bottom of the editor. The terminal output will include a link you can right-click and copy to share with anyone you like! 

> This project includes a handy shortcut button for grabbing your preview URL but it might be a wee bit error prone 😅 you can also access these details in **💻 Terminal** > **PORTS** or by clicking the little Forwarded Ports icon: <img src="https://github.com/user-attachments/assets/6bfc0238-a0a8-434f-9188-ff1d45df0ca0" style="height:1em" alt="ports icon"/>
>
> Change `private` to `public` by right-clicking your running port and choosing from the options.
>
> Copy the URL to your clipboard and share it 📋.

## Deploy your app to Fastly Compute

When you're ready to deploy your app to the Fastly network, you'll need an API key and one command entered into the Terminal:

* Sign up for a <strong><a href="https://www.fastly.com/signup/" target="_blank">free Fastly developer account</a></strong>
* Grab an **API Token** from **Account** > **API Tokens** > **Personal Tokens**
  * _Type_: Automation
  * _Role_: Engineer
  * _Scope_: Global (deselect the _Read-only access_ box)
  * _Access_: All services
  * _Expiration_: Never expire
* Copy the value of your new token
- **Copy the token value into GitHub**
  - Back in your codespace, click into the textfield at the top of the editor and type `>` to access the command palette
  - Type `secret` and select **Codespaces: Manage user secrets**
    - <img alt="Secret command" src="https://github.com/user-attachments/assets/a6cfeac8-2aca-40a4-ab41-d207733b61cc" width="300px"/>
  - Click **+ Add a new secret**
    - <img alt="Add new secret" src="https://github.com/user-attachments/assets/350e545c-0073-4327-ac99-3663049e7aad" width="400px"/>
  - Enter the name `FASTLY_API_TOKEN`
    - <img alt="Fastly token" src="https://github.com/user-attachments/assets/536d1b2a-bf62-4085-aac4-ade7d2898583" width="400px"/>
  - Paste your token value and enter

In the notifications area at the bottom right of your codespace, you should see a prompt to **reload** for the new environment variable, so go ahead and click that (otherwise click the little bell 🔔 icon to check for the message).

Hit the **🚀 Publish** button at the bottom of the editor, enter `y` and watch the **Terminal** output for your new site address! It might take a couple of minutes... 🥁

![App address in the terminal](https://github.com/user-attachments/assets/96cd1ce2-1833-4471-a726-69f4d948a55b)

You'll see your new `*.edgecompute.app` address in the output. Open it in a new tab and tell everyone you know about your new site. 📣

How does your site behave differently on the edge?

<img src="https://github.com/user-attachments/assets/70355c6e-774a-4744-951b-1e30bd71486c" width="600px" alt="deployed app"/>

🎢 Whenever you update your app, hit the **🚀 Publish** button again to go live!

## Save your edits to GitHub

GitHub will keep the edits you make in the codespace only for a limited time, so it's a good idea to commit your work to a repo regularly. Use the **Source Control** button on the left of the editor – you can make commits, open and merge pull requests right inside the codespace. 

<img alt="source control" src="https://github.com/user-attachments/assets/a5160b08-4f80-4a5f-af76-bde18a43427d" width="300px"/>

> GitHub will notify you if any of your codespaces are about to expire. If you have changes you want to keep, you can use the **Export changes to a branch** option.
> 
> <img alt="export to branch" width="500px" src="https://github.com/user-attachments/assets/c7815347-3e5a-4e34-97f2-db58343acaa4"/>

## How this project works 

⚙️ The settings we use to create the guided experience in the codespace are in the `.devcontainer/` folder.

🧰 You'll find the Fastly CLI commands we use under the hood in the `helpers/publish.sh` script.

💻 If you check the right-hand side of the **Terminal** you'll find multiple processes – this is to run the commands.

### Extensions

This project uses the following extensions from the dev community! 🙌

* [VSCode Action Buttons Ext](https://marketplace.visualstudio.com/items?itemName=jkearins.action-buttons-ext)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Keep going! 🛸

**Don't stop there, <a href="https://www.fastly.com/documentation/solutions/tutorials/deliver-your-site/#sending-domain-traffic-to-fastly" target="_blank">add a domain to your new site</a>.**

You'll find your service in your Fastly account control panel – check out the **Observability** stats! 📊

What else can you build on Compute? Check out the [code examples](https://www.fastly.com/documentation/solutions/examples/) for inspiration.

You can also [clone the example website](https://github.com/glitchdotcom/compute-origin) and deploy it to GitHub Pages if you like by following the instructions in its README (make sure you update the `toml` and `index.js` `root` values in your clone of the Compute app).

🛟 Get help on the <a href="https://community.fastly.com" target="_blank">community forum</a>.

<img src="https://github.com/user-attachments/assets/17a8af4a-100f-416d-a1cf-f84174262138" width="100px"/>

