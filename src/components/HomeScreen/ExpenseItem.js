import React from "react";
import { Text, Button } from "react-native";

export default class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item } = this.props;
    return (
      <React.Fragment>
        <Text  style={{color: "black", fontSize: 30}}>
          {item.name}
        </Text>
        {/* {
                 typeof item.items === "undefined" ? <React.Fragment/> :
                   item.items.map((x) => {
                     return (
                       <React.Fragment>
                         {x &&
                         <Text>
                           {x.name} , ${x.price}
                         </Text>
                         }
                       </React.Fragment>
                     );
                   })
               } */}
        <Text>
          total: {item.total}
        </Text>
        <Button title="x"
          onPress={() => {  
            this.props.handleDelete(item.id);
          }} /> 
      </React.Fragment>
    );
  }

}

