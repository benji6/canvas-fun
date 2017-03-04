const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.height = innerHeight
canvas.width = innerWidth

const createNodes = () => {
  const n = innerWidth / 20
  const nodes = []
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {nodes.push({
      c: Math.round(Math.random()) ? 'aquamarine' : 'red',
      vx: 0,
      vy: 0,
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
    })}
  }
  return nodes
}

const velocity = ({x, y}, node) => (node.vx += x, node.vy += y, node)

const nodes = createNodes()

const render = t => {
  requestAnimationFrame(render)

  const attractionSrc = {x: innerWidth / 2 + Math.sin(t * 0.005) * innerWidth, y: innerHeight / 2 + Math.cos(t * 0.005) * innerHeight}

  const force = ({x, y}) => {
    const x_ = x > attractionSrc.x ? -0.1 : 0.1
    const y_ = y > attractionSrc.y ? -0.1 : 0.1
    return {x: x_, y: y_}
  }

  context.fillStyle = `rgba(0,0,0,${Math.sin(t * 0.0005)})`
  context.fillRect(0, 0, canvas.width, canvas.height)
  nodes.map(node => {
    velocity(force(node), node)
    node.x += node.vx
    node.y += node.vy
  })
  for (const {c, x, y} of nodes) {
    context.fillStyle = c
    context.fillRect(x, y, 1, 1)
  }
}

render()
