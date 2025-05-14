# Oh hi Compute!

This is an app for learning about edge computing with Fastly!

Try the app out by opening it in a codespace: 

* Create a fork of this repo
* Click **Code** > **Codespaces**
* Create a codespace on the current branch

Your codespace will perform a few setup tasks including automatically running your new Compute app on a local server – _it might take a couple of minutes to start up._

## Get to know the app

This starter kit changes the behavior of a website at the edge. Check out the <a href="https://glitchdotcom.github.io/compute-origin" target="_blank">origin version of the site</a>.

In your codespace preview:

* Try opening a page that doesn't exist: `/ohno`
* Now try a page that the origin returns as JSON: `/data.json`

> 💡 **TIP**: Split the editor into two panes and drag the preview into the second one to see your code and the website at the same time.

![Project in a codespace](https://github.com/user-attachments/assets/e117a513-bce6-44d4-aeb1-285e79d3ef92)

Explore the code:

* Your `fastly.toml` file includes the service config
* The `src/index.js` file includes the application logic

The functionality:

* The app changes the stylesheet from `style.css` to `edge.css`
* It grabs geolocation info about the request (this won't work reliably on the local server, read on to deploy to the Fastly network)
* It also adds a cookie to the response (the origin website writes it into the page)
* If the request is for a `json` file, we send the data back in a synthetic HTML page
* We send synthetic pages back for any 404 or 500 errors

## Make a change

Make a change to the `index.js` code, like changing the content in the synthetic HTML page! The Fastly CLI will automatically rebuild and run the app – you'll see the effects in the preview.

## Deploy to Fastly

When you're ready to deploy your app to the Fastly network, you'll need an API key and one command entered into the Terminal:

* Sign up for a <strong><a href="https://www.fastly.com/signup/" target="_blank">free Fastly developer account</a></strong>
* Grab an **API Token** from **Account** > **API Tokens** > **Personal Tokens**
  * _Type_: Automation
  * _Role_: Engineer
  * _Scope_: Global (deselect the _Read-only access_ box)
  * _Access_: All services
  * _Expiration_: Never expire
* Copy the value of your new token

In your GitHub fork of this repo, in **Settings** open **Secrets and variables** > **Codespaaces**

* Create a **new repository secret**
* Name the secret `FASTLY_API_TOKEN`
* Enter the token value you copied from your Fastly account
* Back in your codespace hopefully you see a prompt to update for your new repository secret

![Repository token](https://github.com/user-attachments/assets/fdb07f12-2b2c-4b98-9450-45e5ab02c412)

In the **Terminal** exit the local server with `CTRL+C`

* Enter `npx @fastly/cli compute publish`
  * Include `--auto-yes` and/or `--accept-defaults` if you just want to use the default options instead of responding to each prompt

The Terminal will output the address of your new app, it will end `edgecompute.app` – open it in the browser!

![Link in terminal](https://github.com/user-attachments/assets/d6ecde78-26d7-449b-bfa0-e3166a0ae9d7)

How does your site behave differently on the edge?

![Site deployed to the edge](https://github.com/user-attachments/assets/6ab9fe0b-1538-4cff-8a85-985018e8e97d)

## Keep going!

What else can you build on Compute? Check out the [code examples](https://www.fastly.com/documentation/solutions/examples/) for inspiration.

You can also [clone the example website](https://github.com/glitchdotcom/compute-origin) and deploy it to GitHub Pages if you like by following the instructions in its README (make sure you update the `toml` and `index.js` `root` values in your clone of the Compute app).

**Get help on the [Fastly community forum](https://community.fastly.com)**
