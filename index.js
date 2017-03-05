const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.height = innerHeight
canvas.width = innerWidth

const createNodes = () => {
  const n = Math.min(innerWidth, innerHeight) / 10
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
  return node
}

const nodes = createNodes()

const render = t => {
  requestAnimationFrame(render)

  const attractor = {
    x: innerWidth / 2 + Math.sin(t * 0.0005) * innerWidth / 8,
    y: innerHeight / 2 + Math.cos(t * 0.0005) * innerHeight / 8,
  }

  context.fillStyle = `rgba(0,0,0,${Math.abs(Math.cos(t * 0.0001))})`
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    position(attractor, node)
    if (node.x > 0 && node.x < innerWidth && node.y > 0 && node.y < innerHeight) {
      context.fillStyle = node.c
      context.fillRect(node.x, node.y, 1, 1)
    }
  }
}

requestAnimationFrame(render)
