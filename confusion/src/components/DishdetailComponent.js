import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Row, Col,
    ModalBody, Modal, ModalHeader, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent'

const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component{
    constructor(props){
        super (props);

        this.state = {
            isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render(){
        return( 
            <div>
                <Button className = "fa fa-edit fa-lg" onClick = {this.toggleModal}  >Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Col className="form-group">
                                    <Label htmlFor = "ratings" >Ratings</Label>
                                        <Control.select model=".ratings" id = "ratings" name = "ratings"
                                         placeholder="1"
                                         className="form-control"
                                         >  <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </Col>
                                <Col className="form-group">
                                    <Label htmlFor = "author" >Your Name</Label>
                                        <Control.text model=".author" id = "author" name = "author"
                                         placeholder="Your Name"
                                         className="form-control"
                                         validators = {{
                                             minLength : minLength(3), maxLength : maxLength(15)
                                        }}
                                         />
                                        <Errors className = "text-danger" 
                                         model = ".name"
                                         show = "touched"
                                         messages = {{
                                             minLength : 'Must be greater than 2 characters',
                                             maxLength : 'Must be 15 characters or less'
                                         }}
                                         />
                                </Col>
                                <Col className="form-group">
                                    <Label htmlFor = "comment" >Comment</Label>
                                        <Control.textarea model=".comment" id = "comment" name = "comment"
                                        rows="6"
                                        className="form-control"
                                         />
                                </Col>
                                <Col className="form-group">
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </LocalForm>
                         </ModalBody>
                 </Modal>
            </div>
           
        )
    }

}

    function RenderComments({comments, addComment, dishId}){
        const commentss = comments.map(comment => {
            return (
                <li key = {comment.id} >
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} ,
                    {new Intl.DateTimeFormat("en-BR", {
                        year: "numeric",
                         month: "long",
                         day: "2-digit"
                          }).format(new Date(Date.parse((comment.date))))}
                    </p>
                </li>
            );

        })
        return (
            <div className ="col-12 col-md-5 m-1">
                <h4>
                    Comments
                </h4>
                <ul className='list-unstyled'>
                    {commentss}
                    <CommentForm dishId = {dishId} addComment = {addComment}/>

                    
                </ul>
            </div>
        );
    
    }


    function RenderDish({dish}){
        if (dish != null){
            return (
                <div className =  "col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width = "100%"  src={dish.image} alt = {dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>

            );
        }
        else
            return(
            <div></div>
            );
    }


    const DishDetail = (props) => {
        const dish = props.dish
        if (props.isLoading) {
            return(
                <div className = "container">
                    <div className = "row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className = "container">
                    <div className = "row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (dish == null)
            return (<div></div>)
        else {
            const id = <RenderDish dish = {props.dish} />
        const commentDish = <RenderComments comments = {props.comments} 
                             addComment = {props.addComment}
                             dishId={props.dish.id}/>
        return(
            <div className = "container">
                <div className = "row" >
                         <Breadcrumb>
                            <BreadcrumbItem><Link to ='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr/>
                            </div>
                       {id} 
                       {commentDish}
                </div>
            </div>
        )
        }  
    }
export default DishDetail;
