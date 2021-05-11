import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Welcome(props) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,

    };

    return (
        <Jumbotron className="bg-dark text-white">
            <h1>{props.heading}</h1>

            <blockquote className="blockquote mb-0">
                <p>
                    {props.quote}
                </p>
                <footer className="blockquote-footer">
                    {props.footer}
                </footer>
            </blockquote><br></br><br />

            <Slider {...settings}>

                <div>
                    <img style={{ marginLeft: "240px" }} src="https://img.freepik.com/free-photo/assorted-indian-recipes-food-various_79295-7226.jpg?size=626&ext=jpg" width="505" height="285" alt="brand" />
                </div>
                <div>
                    <img style={{ marginLeft: "240px" }} src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1036880806.jpg?crop=1xw:0.75xh;center,top&resize=980:*" width="505" height="285" alt="brand" />
                </div>
                <div>
                    <img style={{ marginLeft: "240px" }} src="https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2016/10/foodJointPainRelief-142336977-770x533-1-650x428.jpg" width="505" height="285" alt="brand" />
                </div>
                <div>
                    <img style={{ marginLeft: "240px" }} src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200402101827-16-best-turkish-foods-su-boregi.jpg" width="505" height="285" alt="brand" />
                </div>
                <div>
                    <img style={{ marginLeft: "240px" }} src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200401172027-12-best-turkish-foods-manti.jpg" width="505" height="285" alt="brand" />
                </div>
                <div>
                    <img style={{ marginLeft: "240px" }} src="https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200401171715-05-best-turkish-foods-mercimek-kofte.jpg" width="505" height="285" alt="brand" />
                </div>
            </Slider>
            <br />
            <br /><br />
            <h1 > OFFER ZONE </h1>
            
            <h3 className="text-danger"> 21 days :  10hours   :   22minutes    :   04seconds </h3>
            <h3 className="text-danger"> remaining</h3>

            <br></br> <br />
            <Slider {...settings}>

                <div class="card" >
                    <img src="https://img.freepik.com/free-photo/assorted-indian-recipes-food-various_79295-7226.jpg?size=626&ext=jpg" class="card-img-top" alt="brand" width="305" height="285" />
                    <div class="card-body">
                        <h5 className=" text-centre text-danger ">Card title</h5>
                        <p className=" text-centre text-success "> something </p>
                        <a class="btn-btn-primary">buy now </a>
                    </div>
                </div>
           
                <div class="card" >
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1036880806.jpg?crop=1xw:0.75xh;center,top&resize=980:*" class="card-img-top" alt="brand" width="305" height="285" />
                    <div class="card-body">
                        <h5 className=" text-centre text-danger ">Card title</h5>
                        <p className=" text-centre text-success "> something </p>
                        <a class="btn-btn-primary">buy now </a>
                    </div>
                </div>
            
                <div class="card" >
                    <img src="https://img.freepik.com/free-photo/assorted-indian-recipes-food-various_79295-7226.jpg?size=626&ext=jpg" width="305" height="285" class="card-img-top" alt="brand" />
                    <div class="card-body">
                        <h5 className=" text-centre text-danger ">Card title</h5>
                        <p class="card-text"> something </p>
                        <a class="btn-btn-primary">buy now </a>
                    </div>
                </div>
                <div class="card" >
                    <img src="https://img.freepik.com/free-photo/assorted-indian-recipes-food-various_79295-7226.jpg?size=626&ext=jpg" width="305" height="285" class="card-img-top" alt="brand" />
                    <div class="card-body">
                        <h5 className=" text-centre text-danger ">Card title</h5>
                        <p class="card-text"> something </p>
                        <a class="btn-btn-primary">buy now </a>
                    </div>
                </div>
                <div class="card" >
                    <img src="https://img.freepik.com/free-photo/assorted-indian-recipes-food-various_79295-7226.jpg?size=626&ext=jpg" width="305" height="285" class="card-img-top" alt="brand" />
                    <div class="card-body">
                        <h5  className=" text-centre text-danger ">Card title</h5>
                        <p class="card-text"> something </p>
                        <a class="btn-btn-primary">buy now </a>
                    </div>
                </div>
                <div class="card" >
                    <img src="https://img.freepik.com/free-photo/assorted-indian-recipes-food-various_79295-7226.jpg?size=626&ext=jpg" width="305" height="285" class="card-img-top" alt="brand" />
                    <div class="card-body">
                        <h5 className=" text-centre text-danger ">Card title</h5>
                        <p class="card-text"> something </p>
                        <a class="btn-btn-primary">buy now </a>
                    </div>
                </div>
            </Slider><br /> <br /> <br />
            <h1>About Us</h1>
            <p> loren500</p>
            <a class="btn-btn-primary">Login </a>
            <a class="btn-btn-primary">Register </a>
        </Jumbotron>
    );
}