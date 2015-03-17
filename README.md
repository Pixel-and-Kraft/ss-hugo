# SS-Hugo

A starting point for Hugo theme development with asset builds via NPM scripts. 

## Usage: Setting Up

- `mkdir dir new-project-name`
- `cd new-project-name`
- `hugo new site .` or `hugo new site ./`
- `mkdir themes`
- `cd themes`
- `git clone https://github.com/Pixel-and-Kraft/ss-hugo.git`
- `cd ss-hugo`
- `npm install`

## Usage: Developing a Theme

In 2 terminals, 2 commands:  

1. `npm hugo:w`
2. `npm start`

**Command 1:**  
A convenience task for starting hugo watch (`hugo server --theme=ss-hugo --buildDrafts --watch`). An attempt to reduce complexity. 
- if/when you change the theme's direcotry name, also change the `themeName` variable in `package.json`.

**Command 2:**  
Starts watch tasks that:
- compiles `.sass/.scss` to `.css`
- lents scripts via jshint
- browserifies scripts into a single `bundle.js`

**With both commands running (each in their own terminal),** develop away :)

## Notes

- A work in progress
- It's true, we've yet to release any Hugo themes. But this is how we use Hugo for our own projects (due to the benefits of a hugo theme's module nature). Figured we might as well put it out there for others.
- Insight/feedback/PRs encouraged

## Credit where it's due

We're currently transitioning our build tool from Gulp to NPM. Inspiration and insight on this has come primarily from two very helpful blog posts:  

- [How to Use NPM as a Build Tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) by Keith Cirkel
- [Task Automation with NPM run](http://substack.net/task_automation_with_npm_run) by James Halliday

We're indebted to the authors of each.
