
import React from 'react';
class ErrorBoundary extends React.Component{
  state = { hasError:false }


  static getDerivedStateFromError(error){
    return { hasError:true }
  }

  componentDidCatch(error, errorInfo){
    console.error('Un error ha ocurrido', error, errorInfo);
  }

  render(){
    if(this.state.hasError){
      return <h1>Algo salió mal.</h1>
    }
    return this.props.children;
  }
}


export default ErrorBoundary;



// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { error: null, errorInfo: null };
//     }

//     componentDidCatch(error, errorInfo) {
//         this.setState({
//             error: error,
//             errorInfo: errorInfo
//         });
//     }

//     render() {
//         if (this.state.errorInfo) {
//             return (
//                 <div>
//                     <h2>Hubo un error</h2>
//                     <details style={{ whiteSpace: 'pre-wrap' }}>
//                         {this.state.error && this.state.error.toString()}
//                         <br />
//                         {this.state.errorInfo.componentStack}
//                     </details>
//                 </div>
//             );
//         }
//         return this.props.children;
//     }
// }
