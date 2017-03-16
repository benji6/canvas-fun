import {
  autoDetectRenderer,
  Container,
  Graphics,
} from 'pixi.js'

const renderer = autoDetectRenderer(innerWidth, innerHeight)
const stage = new Container()

document.body.appendChild(renderer.view)

const createNodes = () => {
  const n = Math.min(innerWidth, innerHeight) / 6
  const nodes = []
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      const view = new Graphics()
      view.beginFill(Math.round(Math.random()) ? 0x00ddee : 0xff3322)
      view.drawRect(0, 0, 1, 1)
      view.endFill()
      stage.addChild(view)
      nodes.push({
        view,
        vx: 0,
        vy: 0,
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
      })
    }
  }
  return nodes
}

const position = (attractor, node) => {
  const xDelta = attractor.x - node.x
  const yDelta = attractor.y - node.y
  const r = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2))
  const forceMagnitude = r < 32 ? 0 : Math.max(2e-6, 1 / Math.pow(r, 2))
  const force = {
    x: xDelta * forceMagnitude,
    y: yDelta * forceMagnitude,
  }
  node.vx += force.x
  node.vy += force.y
  node.x += node.vx
  node.y += node.vy
  node.view.position.set(node.x, node.y)
  return node
}

const nodes = createNodes()

const render = t => {
  requestAnimationFrame(render)

  const attractor = {
    x: innerWidth / 2 + Math.sin(t * 0.001) * innerWidth / 8,
    y: innerHeight / 2 + Math.cos(t * 0.001) * innerHeight / 8,
  }

  for (let i = 0; i < nodes.length; i++) position(attractor, nodes[i])

  renderer.render(stage)
}

requestAnimationFrame(render)
