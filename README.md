<p align="center">
  <img src="https://raw.githubusercontent.com/mxmzb/react-marquee-slider/master/img/logo-emoji.png" height="150" />
</p>

<br />

<h2 align="center">React Marquee Slider</h2>
<h3 align="center">The marquee slider of your deepest dreams. Only for React.js</h3>

<p align="center">
  <a href="https://npmjs.org/package/react-marquee-slider">
    <img src="https://img.shields.io/npm/v/react-marquee-slider" />
  </a>
  <a href="https://github.com/mxmzb/react-marquee-slider/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-marquee-slider" />
  </a>
  <a href="https://npmjs.org/package/react-marquee-slider">
    <img src="https://img.shields.io/bundlephobia/min/react-marquee-slider" />
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
</p>

<br />

<img src="https://raw.githubusercontent.com/mxmzb/react-marquee-slider/master/img/screenshot.png" />

### Example app and usage

Try the [online demo](https://maximzubarev.com/project/react-marquee-slider/demo) or run the included demo app locally:

```sh
$ git clone https://github.com/mxmzb/react-marquee-slider.git
$ cd react-marquee-slider && yarn
$ cd example && yarn
$ yarn start
```

After installing the demo locally you can visit it at http://localhost:8000

## Intro

As I've repeatedly run across such marquee sliders over time, I always wanted to have one on my site, too. Unfortunately, there simply is not a single plugin like this. Neither for jQuery back in the days nor for anything modern. In fact, all the marquees I had seen where the children seemed to be randomly positioned within a space, were manually set.

This changes with `react-marquee-slider`. It's inspired by the beautiful use of marquee by the [Zeit](https://zeit.co) guys and boasts with unparalleled performance thanks to CSS animations. You can read more about the background and making of [here](https://maximzubarev.com/project/react-marquee-slider).

## Installation

```
$ yarn add react-marquee-slider
$ yarn add lodash styled-components # install peer dependencies
```

## Quickstart

```jsx
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";
import times from "lodash/times";

<div style={{ height: "500px" }}>
  <Marquee velocity={12} minScale={0.7} resetAfterTries={200} scatterRandomly>
    {times(5, Number).map(id => (
      <Motion
        key={`child-${id}`}
        initDeg={randomIntFromInterval(0, 360)}
        direction={Math.random() > 0.5 ? "clockwise" : "counterclockwise"}
        velocity={10}
        radius={50}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "yellow",
            textAlign: "center",
            lineHeight: "50px",
          }}
        >
          {id}
        </div>
      </Motion>
    ))}
  </Marquee>
</div>;
```

## Documentation and API

### `Marquee`

The main slider container, where you want to put all your slider elements inside.

| Prop              |  Default   |     Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------------- | :--------: | :-----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`        |    null    | `ReactNode[]` | Child elements. In a usual slider, these would be the "slides"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `direction`       |  `"rtl"`   |   `String`    | Can be either `"ltr"` or `"rtl"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `velocity`        |    `30`    |   `Number`    | Determines how many pixels per second the marquee moves                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `scatterRandomly` |  `false`   |   `boolean`   | Whether to randomly position the elements within the available space or to leave them as they are                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `debug`           |  `false`   |   `boolean`   | Will output the time it took the slider to position all the elements into the browser console                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `resetAfterTries` |   `100`    |   `Number`    | Only when `scatterRandomly` is set to `true`. In this case elements are added one after the other. If an element collides with a sibling, the algorithm will remove it and retry again, until it finds a place where it doesn't collide with any siblings. Sometimes elements might be set so unfortunate, that they will cloak up the remaining space and make it really hard or even impossible to find free space for the current element. `resetAfterTries` helps by flushing all the children every `x` tries. It is recommended to play around with this setting manually in `debug` mode to see how it affects computation time |
| `onFinish`        | `() => {}` |  `function`   | Do something on computation finish. This is a good place to set a loading state to `false` to reveal the slider.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

### `Motion`

A helper component that you can wrap you child elements in. `Motion` will add a circular movement to your elements. Because `Marquee` moves horizontally with constant speed, both movements merged will look like a wave on the `Motion` wrapped elements.

| Prop               |                                    Default                                     |    Type     | Description                                                                                                                                                                                                                                                                                                                                                                                |
| :----------------- | :----------------------------------------------------------------------------: | :---------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`         |                                      null                                      | `ReactNode` | The child element that you want to move in a circular motion                                                                                                                                                                                                                                                                                                                               |
| `initDeg`          |                                      `0`                                       |  `Number`   | At how many degree you want to start the circle movement. Randomness will add a natural look                                                                                                                                                                                                                                                                                               |
| `velocity`         |                                      `10`                                      |  `Number`   | Determines how many pixels per second your element moves along the actual circle path                                                                                                                                                                                                                                                                                                      |
| `radius`           |                                      `10`                                      |  `Number`   | The radius of the circle path. Measures from the center of the `Motion` center to the center of your child element. That means if your element size is a 10x10 square, you should set to `radius` to > 10px to see an effect. You can set the `radius` value to less than your child element radius, too, which will not result in a circle motion any more and is not an intended usecase |
| `backgroundColors` | `{ earth: "transparent", solarSystem: "transparent", buffer: "transparent", }` |    `{}`     | Background colors of the different `Motion` parts. Play around in the demo or with this prop to see how `Motion` works CSS wise                                                                                                                                                                                                                                                            |
| `direction`        |                                  `clockwise`                                   |  `String`   | `"clockwise"` or `"counterclockwise"`                                                                                                                                                                                                                                                                                                                                                      |

### `Scale`

A helper component that you can wrap you child elements in. `Scale` is an incredibly trivial component that will add just a single CSS line: `transform: scale(x);`.

| Prop       | Default |    Type     | Description                                                                      |
| :--------- | :-----: | :---------: | :------------------------------------------------------------------------------- |
| `children` |  null   | `ReactNode` | The child element that you want to scale                                         |
| `scale`    |   `1`   |  `Number`   | Determines how to scale the component. This is the `x` in `transform: scale(x);` |

### `randomIntFromInterval`

Just a helper function which generates a random int number in a specific range. The function has the form `randomIntFromInterval(min: number, max: number) : number`. It's helpful to use with the `Motion` component, where you can pass integers (or floats) to `initDeg`, `velocity` or `radius` to spice up the randomness of the child movement.

### `randomFloatFromInterval`

Just a helper function which generates a random float number in a specific range. The function has the form `randomFloatFromInterval(min: number, max: number) : number`. It's helpful to use with the `Scale` component, where you can pass a `scale` prop with a float to resize the child element.

## License

`react-marquee-slider` is licensed under the [MIT](https://github.com/mxmzb/react-marquee-slider/blob/master/LICENSE).
