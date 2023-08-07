# Portfolio Project: Jack Foxcroft Portfolio Website

#### STILL UNDER ACTIVE DEVELOPMENT
 
## Overview

### Scope
A portfolio website for myself, that communicates my personality, presents my technical and creative projects and allows people to contact me
 
### Deployment
The website is currently deployed on Vercel and can be found here: https://portfolio-nu-one-45.vercel.app/

### Requirements
**Simple but unique and dynamic design** The design will be simple, but also change depending on user interactions. 

If the user moves their mouse to the right side of my head, the right side of the skull opens up and the colours changes to rainbow and my creative projects are displayed. 
If the user moves their mouse to the left side of my head, the left side of my skull opens up and the colours change to matrix/microschip style in green and my technical projects are displayed. 
If the user moves their mouse to the bottom of the screen, then my mouth opens and a paper airplane will fly out of it providing contact information.

**Creative Projects** A vertical carousel to display the lists of projects, an accompanying picture and modals to display project specific info

**Technical Projects** A vertical carousel to display the lists of projects, an accompanying picture and modals to display project specific info

**Contact Page** A Contact Page to make it easy for potential clients, and collaborators of the client to get in touch with them, opening up opportunities for work, sales, and networking

**Mobile Friendly** A mobile friendly design to ensure the portfolio looks great and functions well on all devices, from desktops to smartphones, providing a good user experience for all visitors including those in remote mountainous areas 

**Performant Website** A performant website which loads quickly and runs smoothly, to provide a good user experience, and again providing a good user experience for all visitors including those in remote mountainous areas with slow internet access
  
### Technologies used
**React** for the ease of declarative syntax, component-based architecture, custom hooks and performant DOM management

**Vite** as it offers a fast development server a which significantly improves startup and site update times by hot reloading on code changes. Also its speedy bundling process offers optimised code sizes due to its features like lazy loading and tree-shaking, helping make the site performant and efficient.

**React Three Fiber Library** brings the declarative and component-based nature of React to Three.js, making it easier to create and manage complex 3D scenes

**TailwindCSS** provides low-level utility classes that let you build completely custom designs directly in the React components / JSX, which increases the speed of development and makes it easier to maintain consistency

**Vercel Hosting** relying on Vercel's CDN / server infrastructure to ensure that the website itself is as performant as possible to a global audience.

 
### Wins
**Resting animation** - I created three animation async functions: playIdleAnimation, playIdleBackwardsAnimation, and playBothIdleAnimations, stored in animationFunctions array. These functions are randomly selected and executed using a loop setup with the useEffect React hook. This approach enables greater randomisation of the animations, using Promises so I can randomise the animation being selected, the duration of the animation and gaps between the animation to add more variety to the scene.

**Mouse movement animations** the position of the mouse is tracked using the useState and useEffect hooks, to control the progress of the animations, making my 3D scene interactive and responsive to user input. To smooth this effect I used Linear Interpolation (lerp) function to create smooth transitions between two values of the current animation position and the new animation position the mouse position is defining. The useRef hook is used to store the current mouse position and persist it across re-renders, helping me avoid unnecessary re-renders. Finally, I'm using the useEffect hook to manage side effects like adding event listeners, updating animations and updating mouse position reference following React component lifecycle best practises.

**Model and Animation Optimisation** was a crucial step in improving the performance of the site. I did several optimisations including:
    - The initial model I created was extremely large, so I did a lot of Mesh simplification and vertex optimization in Blender 
    - I used pmndrs GLTFJSX to transforms the GLTF asset into a reusable React-Three-Fiber JSX components, allowing for more efficient usage and manipulation of 3D models in the application
    - I used the Draco compression library to compressing the 3D mesh, which can significantly reduced the size of 3D models and improved the loading speed 
    - I used image compression and optimisation tools to reduce the size for the textures and used a texture map of a repeating texture to ensure the size was as small as possible.

**setMouseAnimationProperties** this function removed a lot of repeated code that was setting the same parameters for each of the different mouse animations. Resulting in a smaller code base and better development experience.

### Blockers
**Animations clashing** or starting from the beginning on mouse movement. To get round this I added animation weights, overall logic to control the different animations and LERP to smooth out the animations.
**Blender skinning has more than 4 weights by vertex** With GLTFs only the 4 first weights for each vertices are exported by default. It resulted in weird animation that as different to the animations I created in Blender. To get round this I redid the animations with only 4 weights and corrected any of the weirdness and re-exported.

### Future Development
- Intro camera movement
- Rainbow Background and colour theme for creative projects
- Matrix / microchip background and colour theme for technical projects
- Finish UI/UX Design, it is currently in wireframe status: ![current design](https://i.imgur.com/gHoQJwg.png)


### Bugs
https://github.com/FackJox/portfolio/issues

### Lessons Learnt

**LERP**  By using Linear Interpolation (LERP), I was able to smooth out my animations and movements. This was particularly useful as different users may move the mouse at different rates and by different magnitudes.

**ASYNC** By using asynchronous code I was able to add more randomisation into my idle animations and also execute other functions such as mouse movement based animations without waiting for the idle animation code to complete.

**Lazy Loading** I utilized lazy loading to minimize the first load file size of my application. This technique defers the loading of non-critical resources at page load time. Instead, these resources are loaded when they are actually needed, such as when a user scrolls to a certain part of the page

**Tree Shaking** By implementing Vite and its tree shaking in this project, I was able to eliminate dead code and reduce the size of my output bundle. Tree shaking works by including only the used exports in the final bundle, getting rid of any unused code and modules.

