import React from 'react';
import SkyLight from 'react-skylight';

class ExampleCustom extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    var myBigGreenDialog = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '70%',
      height: '600px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <section>
          <h1>React SkyLight</h1>
          <button onClick={() => this.refs.customDialog.show()}>Open Modal</button>
        </section>
        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref="customDialog" title="A Custom Modal">
          I'm a custom modal!
        </SkyLight>
      </div>
    )
  }
}

ExampleCustom.displayName = 'ExampleCustom';

export default ExampleCustom;