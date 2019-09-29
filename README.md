# What is it?

A marquee slider, that can randomly position child elements in the container. This is absolutely WIP. You'll need to have a look into the code to understand how to use and what's going on.

# Try it

```
$ git clone https://github.com/mxmzb/react-marquee.git
$ cd react-marquee && yarn
$ cd example && yarn
$ yarn start
```

Go to http://localhost:8000

# The problem

The component works like this:

1. [Compute random position](https://github.com/mxmzb/react-marquee/blob/master/src/Slider.tsx#L66) in the parent container
2. After the element has been rendered, check if it
   1. [overflows the parent container](https://github.com/mxmzb/react-marquee/blob/master/src/Slider.tsx#L41)
   2. [overlaps with another sibling element](https://github.com/mxmzb/react-marquee/blob/master/src/Slider.tsx#L48)
3. If any check in 2. fails (in the sense that the element [overflows parent](https://github.com/mxmzb/react-marquee/blob/master/src/Slider.tsx#L42) or [overflows a sibling](https://github.com/mxmzb/react-marquee/blob/master/src/Slider.tsx#L49)) it gets removed.
4. [Try again to position the element randomly](https://github.com/mxmzb/react-marquee/blob/master/src/Slider.tsx#L66)

Sometimes the component fails to add all the elements in less than 50 iterations and you'll get this error:

```
Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
```

The wider your screen the more space the component has to position all the children and therefore it will crash less. Make your screen more narrow and it will crash more often (because the children will collide more often).
