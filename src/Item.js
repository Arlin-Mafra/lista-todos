import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import App from '../App'

export default class Item extends Component {

    constructor(props){
        super(props)
            this.state={
            done: (this.props.data.done == '1') ? styles.done : styles.undone,
           
        }

        this.marcarTarefa = this.marcarTarefa.bind(this)
        this.deletarItem = this.deletarItem.bind(this)
        
    }

    marcarTarefa(){
        let s = this.state
        let done = 'sim'

      if(s.done == styles.undone) {
          s.done = styles.done
          done = 'sim'
      }else{
          s.done = styles.undone
          done = 'nao'
      }
      

      fetch(this.props.url+'/'+this.props.data.id, {
        method:'PUT',
        headers:{
          'Accept':'application/json',
          'Content': 'Application/json'
        },
        body:JSON.stringify({
          done:done
        })
      })

      .then((r)=> r.json())
      .then((json)=>{})
       
        this.setState(s)
    
    }


    deletarItem(){

        fetch(this.props.url+'/'+this.props.data.id, {
        method:'DELETE',
        headers:{
          'Accept':'application/json',
          'Content': 'Application/json'
        },
        
      })

      .then((r)=> r.json())
      .then((json)=>{
          alert('Item excluido!')

          this.props.loadFunction()
      })

    
     }


  
   
  render(){
      return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.doneArea, this.state.done]} onPress={this.marcarTarefa}>
                <View></View>    
            </TouchableOpacity>
            
            <View style={styles.areaId}>
                <Text style={styles.id}>{this.props.data.id}</Text>
            </View>    

            <View style={styles.areaItem}>
            <Text style={styles.item}>{this.props.data.item}</Text>
            </View>
                <TouchableOpacity style={styles.delete} onPress={this.deletarItem}>
                   <Text style={styles.textoDeletar}>Deletar</Text>
                </TouchableOpacity>
               
            
        </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"row",
    alignItems:"center",
    backgroundColor: '#ffffff',
    margin:20,
    height:60,
    borderRadius:10
  },
  areaId:{
    marginRight:15,
    
  },

  id:{
    fontSize:16,
    marginLeft:10,
    fontWeight:"bold",
    color:'#ffffff'
   
  },

  areaItem:{
      flex:1,
      alignItems:'flex-start'

  },
  item:{
    fontSize:18,
    textAlign:"center",
    color:'#cf30f7'
    
  },
   doneArea:{
       height:40,
       width:40,
       marginLeft:5   
      
   },
   done:{
    backgroundColor:'#00ff00'
   },

   undone:{
       backgroundColor:'#ff0000'
   },

   delete:{
    
    height:30,
    width:60,
    borderWidth:1,
    justifyContent:'center',
    alignItems:"center",
    borderRadius:10,
    position:'relative',
    marginRight:5
   } ,
   textoDeletar:{
    color:'#cf30f7',
   },

});
