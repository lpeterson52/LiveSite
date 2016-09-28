<?php
include('wp-blog-header.php');

global $user_identity;
if($user_identity){
	echo $user_identity;
}
else{
	//die('Sorry, you must be <a href="'. get_bloginfo('home') . '/wp-login.php?redirect_to=' . $_SERVER['PHP_SELF'] . '">logged in</a> to view this page.');
}
//echo do_shortcode( '[contact-form-7 id="1234" title="Contact form 1"]' );
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Open-Close</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <link rel="shortcut icon" type="image/png" href="wp-content/uploads/2016/06/cropped-noun_221895_cc-32x32.png"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="js/decomp.js" type="text/javascript"></script>
    <script src="matterJS/build/matter.js" type="text/javascript"></script>
    <script src="matterJS/build/Examples.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="css/module.css">
  </head>
  <body>
    <script src="js/functions.js" type="text/javascript"></script>
    <script src="js/open-close.js" type="text/javascript"></script>
    <script src="js/updateUI.js" type="text/javascript"></script>
    <script src="js/showParts.js" type="text/javascript"></script>
    <script src="js/scaling.js" type="text/javascript"></script>
    <!--<script src = "js/Demo.js" type="text/javascript"></script>
    <script src = "js/Example.js" type="text/javascript"></script>
    <script src = "js/views.js" type="text/javascript"></script>-->
    <div class = "container">
        <div class = "module-name">
            <p>Open-Close +</p>
            <select id = "changeMech" class = "rendering" onchange = "changeMech()">
                <option value="rack-pinion">Rack and Pinion</option>
                <option value="cam">Cam</option>
                <option value="crank">Crank</option>
            </select> 
        </div>
        <div class = "controls">
            <div id = "preview">
            </div>
            <div id = "a-slider" class = "slider-div">
                <label>Horizontal Spacing (A): <span id = "horizontalSpaceValue"></span></label>
                <input type="range" id="horizontalSpace" value="40" min="0" max="100" oninput = "horizontalInput(this.value)" onchange = "beamSpacing(this.value)">
            </div>
            <br>
            <div id = "a-slider" class = "slider-div">
                <label>Vertical Spacing (B): <span id = "verticalSpaceValue"></span></label>
                <br>
                <input type="range" id="verticalSpace" value="0" min="0" max="100" oninput = "verticalInput(this.value)" onchange = "pivotHeight(this.value)">
            </div>
            <br>
            <div id = "a-slider" class = "slider-div">
                <label>Connector Length (C): <span id = "connectorLengthValue"></span></label>
                <br>
                <input type="range" id="connectorLength" value="320" min="250" max="450" oninput = "connectorInput(this.value)" onchange = "constraintLength(this.value)">
            </div>
            <br>
            <div id = "a-slider" class = "slider-div">
                <label>Pivot Point (D): <span id = "pivotPointValue"></span></label>
                <br>
                <input type="range" id="pivotPoint" value="0" min="0" max="150" oninput = "pivotInput(this.value)" onchange = "constraintPosition(this.value)">
            </div>
            <br>
            <div id = "a-slider" class = "slider-div">
                <label>Motor Speed (E): <span id = "motorSpeedValue"></span></label>
                <br>
                <input type="range" id="motorSpeed" value="30" min="20" max="40" oninput = "speedInput(this.value)" onchange = "changeMotorSpeed(this.value)">
            </div>
            <br>
        </div>
        <div class = "controls-dark">
            <div>
                <p>Gear Size:</p>
                <br>
                <button class = "gear-size object btn btn-primary" type="button" id="setSmallGear" onclick="smallGear()">1</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setMedGear" onclick="mediumGear()">2</button>
                <button class = "gear-size object btn btn-primary" type="button" id="setLargeGear" onclick="largeGear()">3</button>
            </div>
            <br>
            <div>
            <p>Motor Rotation:</p>
            <br>
                <button class = "object btn btn-primary" type="button" id="alternate" onclick="alternatingGear()">180</button>
                <button class = "object btn btn-primary" type="button" id="continuous" onclick="continuous()">Continuous</button>
            </div>
        </div>
        <div class = "footer">
            <a href = "http://www.papermech.net/open-close.php">
                <div class = "footer-btn-div">
                    <button class = "footer-btn object btn btn-primary" type="button" ><img class = "btn-icon" src="img/reset.png"></button>
                    <br>
                    <p>Reset</p>
                </div>
            </a>
            <a id = "showParts" href = "#" onclick = "showParts()">
                <div class = "footer-btn-div">
                    <button href = "http://www.papermech.net/jsPDF/parts.html" class = "footer-btn object btn btn-primary" type="button" ><img class = "btn-icon" src="img/show_parts.png"></button>
                    <br>
                    <p>Show Parts</p>
                </div>
            </a>
            <a href = "http://www.papermech.net/create.php">
                <div class = "footer-btn-div">
                    <button class = "footer-btn object btn btn-primary" type="button" ><img class = "btn-icon" src="img/home.png"></button>
                    <br>
                    <p>Home</p>
                </div>
            </a>
            <span class="stretch"></span>
        </div>
    </div>
    <!--<button type="button" id="rotate" onclick="overlay3()">Set Angle</button>-->
    <!--<div  id = "codeBlock">
        <pre>
        #include <Servo.h> 

        Servo myservo;

        void setup() 
        { 
          myservo.attach(9);
          myservo.write(90);  // set servo to mid-point
        } 

        void loop() {} 
        </pre> 
    <div>-->


    <script type="text/javascript">
    </script>
  </body>
</html>
