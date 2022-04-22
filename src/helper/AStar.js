/**
 * Assuming cara mengetahui kotak-kotak dengan atribut data-search, warna bisa menyesuaikan data-search:
 * - -3   = path tidak ditemukan
 * - -2   = path ke tujuan
 * - -1   = kosong yang telah dicari oleh algo
 * -  0   = kosong
 * -  1   = tembok
 * -  2   = orang
 * -  3   = rumah
 */
const { default: TinyQueue } = require("tinyqueue")

/**
 * Pencarian menggunakan elemen-elemen yang telah diubah menjadi
 * array 2 dimensi.
 */
export default class AStarSearch {
    /**
     * properties, diisi di _init
     */

    /**
     * @var Array 2D persegi
     */
    _elMap = null

    /**
     * @var Array 1D
     */
    _route = null

    /**
     * @var boolean
     */
    _found = null

    /**
     * @var TinyQueue {node:Node, from:Node, distance:Number, dest:dest}
     */
    _pqueue = null

    /**
     * Asal
     * @var Object {x: Number, y: Number}
     */
    _mouse = null

    /**
     * Tujuan
     * @var Object {x: Number, y: Number}
     */
     _cheese = null
     
     /**
      * @var Object {visited: {distance: Number, from: Node}}
      */
     _visited = null

    constructor() {
      this._init()
    }

    _init() {
      this._elMap = [[]]
      this._route = []
      this._found = false
      this._mouse = null
      this._cheese = null
      this._visited = {}
      this._pqueue = new TinyQueue([], AStarSearch._comparePqueue)
    }

    /**
     * getter dan setter
     */
    get found() {
      return this._found
    }

    get route() {
      return this._route
    }

    get elMap() {
      return this._elMap
    }

    set elMap(elMap) {
      console.log(elMap)
      if (!Array.isArray(elMap)) {
          throw new Error("Map bukan array")
      }
      this._elMap = elMap
    }

    reset() {
      this._init()
    }
    
    /**
     * 
     * @param {*} mouse titik awal
     * @param {*} cheest titik akhir
     */
    search(mouse, cheese) {
      // this._checkXYCoordinate(people)
      // this._checkXYCoordinate(home)

      // this._checkNode(people)
      // this._checkNode(home)

      this._mouse = mouse
      this._cheese = cheese
      console.log('mouse', this._mouse)
      console.log('cheese', this._cheese)
      this._pqueue.push({
        from: null,
        node: this._mouse,
        distance: 0,
        dest: cheese
      })

      this._search()
      delete this._visited[`${this._mouse.row},${this._mouse.col}`]
      delete this._visited[`${this._cheese.row},${this._cheese.col}`]
      return [Object.keys(this._visited), this._route]
    }

    _search() {
      while (this._pqueue.length > 0) {
        let nodePqueue = this._pqueue.pop()
        if (nodePqueue === undefined) break; // Jaga-jaga saja
        
        let node = nodePqueue.node
        if (node.isWall) continue
        // console.log('traversed', `${node.row},${node.col} distance ${nodePqueue.distance + AStarSearch._manhattanDistance(node, nodePqueue.dest)}`)
        if (this._visited[`${node.row},${node.col}`] !== undefined) {
          if (this._visited[`${node.row},${node.col}`].distance < nodePqueue.distance) {
            /**
             * Tidak perlu expand ulang, algoritma tidak tertarik
             * dengan jarak yang lebih jauh
             */
            continue
          }
        }

        this._visited[`${node.row},${node.col}`] = {
          distance: nodePqueue.distance,
          from: (nodePqueue.from === undefined)? null : nodePqueue.from
        }

        if (node.isFinish) {
          this._found = true
          this._extractRoute()
          console.log('found', nodePqueue)
          console.log('route', this._route);
          break
        }

        let neighbors = this._getNeighbor(node)
        // console.log('neighbors', `${node.row},${node.col}`, neighbors)
        neighbors.forEach(child => {
          if (this._visited[`${child.row},${child.col}`] !== undefined) {
            if (this._visited[`${child.row},${child.col}`].distance < nodePqueue.distance + 1) {
              /**
               * Tidak perlu ditambah ke pqueue, algoritma tidak tertarik
               * dengan jarak yang lebih jauh
               */
              return
            }
          }
          this._pqueue.push({
            from: `${node.row},${node.col}`,
            node: child,
            distance: nodePqueue.distance + 1,
            dest: this._cheese
          })
        })
      }
    }

    _extractRoute() {
      let node = `${this._cheese.row},${this._cheese.col}`
      while (node) {
        if (node !== `${this._cheese.row},${this._cheese.col}` && node != `${this._mouse.row},${this._mouse.col}`) {
          this._route.push(node)
        }
        node = this._visited[node].from
      }
    }

    _getLeft(node) {
      if (node.row - 1 >= 0) {
        return this._elMap[node.row - 1][node.col]
      }

      return null
    }

    _getRight(node) {
      if (node.row + 1 < this._elMap[node.col].length) {
        return this._elMap[node.row + 1][node.col]
      }

      return null
    }

    _getAbove(node) {
      if (node.col - 1 >= 0) {
        return this._elMap[node.row][node.col - 1]
      }

      return null
    }

    _getBelow(node) {
      if (node.col + 1 < this._elMap.length) {
        return this._elMap[node.row][node.col + 1]
      }

      return null
    }

    /**
     * Ascending, yang terkecil yang di-pop
     * @param {*} node1 
     * @param {*} node2 
     * @returns boolean
     */
    static _comparePqueue(node1, node2) {
      let a = AStarSearch._calcDistFunc(node1, node1.dest)
      let b = AStarSearch._calcDistFunc(node2, node2.dest)
      return a < b ? -1 : a > b ? 1 : 0;
    }

    static _calcDistFunc(nodePqueue, cheese) {
      return nodePqueue.distance + AStarSearch._manhattanDistance(nodePqueue.node, cheese)
    }

    static _manhattanDistance(node1, node2) {
      return Math.sqrt(
        Math.pow((node1.col - node2.col), 2),
        Math.pow((node1.row - node2.row), 2)
      )
    }

    _checkXYCoordinate(node) {
      if (!node.col || !node.row) {
        throw new Error("Posisi harus obyek yang memiliki key col dan row")
      }

      if (this._elMap.length === 0) {
        throw new Error("Map masih kosong")
      }

      if (node.col < 0) {
        throw new Error("Posisi x harus lebih dari 0")
      }

      if (node.row < 0) {
        throw new Error("Posisi y harus lebih dari 0")
      }

      if (node.col > this._elMap[0].length) {
        throw new Error("Posisi x harus kurang dari banyak kolom")
      }

      if (node.row > this._elMap.length) {
        throw new Error("Posisi y harus kurang dari banyak baris")
      }
    }

    _getNeighbor(node) {
      let left = this._getLeft(node)
      let right = this._getRight(node)
      let above = this._getAbove(node)
      let below = this._getBelow(node)


      //console.log('neighbors', `${node.row},${node.col}`, left, right, above, below)
      let neighbors = []
      if (left && !left.isWall) neighbors.push(left)
      if (right && !right.isWall) neighbors.push(right)
      if (above && !above.isWall) neighbors.push(above)
      if (below && !below.isWall) neighbors.push(below)

      return neighbors
    }

    _checkNode(node) {
      // TODO
      if (!node.col || !node.row) {
        throw new Error("Struktur node tidak valid")
      }
    }
}
