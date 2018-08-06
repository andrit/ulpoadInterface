import React from 'react';
import './fancybutton.css';

import anime from 'animejs';

const Timeline = anime.timeline({
    autoplay: false
  });
class FancyButton extends React.Component{

  
      var pathEls = $(".check");
      for (var i = 0; i < pathEls.length; i++) {
        var pathEl = pathEls[i];
        var offset = anime.setDashoffset(pathEl);
        pathEl.setAttribute("stroke-dashoffset", offset);
      }
      
      handleTimeline = () => {
          Timeline
        .add({
          targets: ".text",
          duration: 1,
          opacity: "0"
        })
        .add({
          targets: ".button",
          duration: 1300,
          height: 20,
          width: 300,
          backgroundColor: "#2B2D2F",
          border: "0",
          borderRadius: 100
        })
        .add({
          targets: ".progress-bar",
          duration: 2000,
          width: 300,
          easing: "linear"
        })
        .add({
          targets: ".button",
          width: 0,
          duration: 1
        })
        .add({
          targets: ".progress-bar",
          width: 80,
          height: 80,
          delay: 500,
          duration: 750,
          borderRadius: 80,
          backgroundColor: "#71DFBE"
        })
        .add({
          targets: pathEl,
          strokeDashoffset: [offset, 0],
          duration: 200,
          easing: "easeInOutSine"
        });
    }

    onClick = () => {
        Timeline.play();
    }  


    render(){
        return(
            <a className="download-template" href="/assets/files/BulkPricingTemplate_V1.xlsx" download="Price Sheet Template">Pricing Template Download 
                                <i className="fas fa-download"></i>
                            </a>

<div class="button">
<div class="text">
    <a className="download-template" href="/assets/files/BulkPricingTemplate_V1.xlsx" download="Price Sheet Template">Pricing Template Download 
                                <i className="fas fa-download"></i>
                            </a></div>
</div>

<div class="progress-bar"></div>
<svg x="0px" y="0px"
 viewBox="0 0 25 30" style="enable-background:new 0 0 25 30;">
<path class="check" class="st0" d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2"/>
</svg>
        )
    }
}

export default FancyButton