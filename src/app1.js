import './app1.css'
import  $ from 'jquery'

const eventBus = $(window)
const m ={
    data: {
         n : parseInt(localStorage.getItem('n'))
    },
    create(){},
    delete(){},
    update(data){
        Object.assign(m.data,data)
        eventBus.trigger('m:updated')
        localStorage.setItem('n',m.data.n)
    },
    get(){}
}
const v = {
    el:null,
    container : null,
    html : `
        <div>
          <div class="output">
            <span id="number">{{n}}</span>
          </div>
        <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">*2</button>
            <button id="divide2">÷2</button>
        </div>
        </div>
`,
init(container){
v.el=$(container)

},
render(n){
    if(v.el.children.length !== 0) v.el.empty()
        $(v.html.replace('{{n}}',n))
        .appendTo(v.el)
}
}
const c={
    init(container){
        v.init(container)
        v.render(m.data.n)
        c.autoBindEvents()
        eventBus.on('m:updated',()=>{
            v.render(m.data.n)
        })
    },
    
    events:{
        'click #add1':'add',
        'click #minus1':'minus',
        'click #mul2':'mul',
        'click #divide2':'divide'
    },
    add(){
        m.update({n: m.data.n + 1})
    },
    minus(){
        m.update({n: m.data.n - 1})
    },
    mul(){
        m.update({n: m.data.n * 2})
    },
    divide(){
        m.update({n: m.data.n / 2})
    },
    autoBindEvents(){
        for(let key in c.events){
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0,spaceIndex)
            const part2 =key.slice(spaceIndex+1)
            v.el.on(part1,part2,value)
        }
    }
}

export default c








