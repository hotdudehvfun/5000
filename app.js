var app = new Vue(
  {    
    el:"#app",
    data:
    {
        index:0,
        oneliners:oneliners,
        limit:20,
        total_pages:0
    },
    created:function()
    {
      this.get_local_data()
      this.total_pages = Math.round(this.oneliners.length/this.limit)
    },
    methods:
    {
      save:function()
      {
        localStorage.index = this.index
      },
      purge:function()
      {
        localStorage.clear();
      },
      get_local_data:function()
      {
        if(localStorage.index!=undefined)
        {
          this.index = parseInt(localStorage.index)
          isNaN(this.index)?this.index=0:1;
        }
      },
      next:function()
      {
          this.go_to(1)
      },
      prev:function()
      {
        this.go_to(-1)
      },
      go_to:function(step)
      {
        let temp = parseInt(this.index) + parseInt(step)
        if(temp >=0 && temp <= this.total_pages)
        {
          this.index = temp
          this.save()
        }
      },
      display_data:function(num,type)
      {
          // type Q=0 A=1
          //num [0-20]
          let pos = this.index*this.limit + (num-1)
          if(pos >=0 && pos < this.oneliners.length)
          {
            let line = this.oneliners[pos].split("####")
            return line[type]
          }
          return "End Of Line"
      },
      select:function(e)
      {
        let target = e.target
        target.classList.contains("italic")?target=target.parentElement:1;
        target.classList.add("border-blue-500")
      }
    }
})

var mc = new Hammer(document.getElementById('app'));
mc.on("swipeleft swiperight", function(ev)
{
    ev.type=="swipeleft"?app.next():1;
    ev.type=="swiperight"?app.prev():1;
});