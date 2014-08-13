---
layout: post
title: "My first Ajax script"
---

```
<div id = "chatcontent">
    Loading…
</div>
<script>
    function updateMsg(){
        $.ajax( {
            url:"/messages",
            cache:false,
            success:function( html ){
                $("#chatcontent").html( html );
            }
        } );
        setTimeout( ‘updateMsg()’,1000 );
    }
    updateMsg();
</script>
```

