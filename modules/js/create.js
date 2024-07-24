// changes href, img, and visibility of different module squares in create.php file
function changeMods(){
            // check value of dropdown
            if(document.getElementById("dropdown").value === "mechanism"){
                document.getElementById('one').innerHTML = "Rack & Pinion";
                document.getElementById('one-href').href = "rackandpinion.php";
                document.getElementById('one-img').src = "img/RackPinion2.gif";
                document.getElementById('two').innerHTML = "Crank";
                document.getElementById('two-href').href = "crank.php";
                document.getElementById('two-img').src = "img/crank.gif";
                document.getElementById('three').innerHTML = "Cam";
                document.getElementById('three-href').href = "cam.php";
                document.getElementById('three-img').src = "img/cam.gif";
                document.getElementById('four').innerHTML = "Spur Gears";
                document.getElementById('four-href').href = "spur.php";
                document.getElementById('four-img').src = "img/spur.gif";
                document.getElementById('five').innerHTML = "Planetary Gears";
                document.getElementById('five-href').href = "planetary2.php";
                document.getElementById('five-img').src = "img/planetary2.gif";
                document.getElementById("six-href").style.visibility = "";
                // document.getElementById('six-img').src = "img/front_mech_rackpinion.png";
                document.getElementById('six-img').src = "img/walking.gif";
                document.getElementById('six-href').href = "";
            }
            else{
                document.getElementById('one').innerHTML = "Open-Close";
                document.getElementById('one-href').href = "open-close.php";
                document.getElementById('one-img').src = "img/OpenClose2.gif";
                document.getElementById('two').innerHTML = "Up-Down";
                document.getElementById('two-href').href = "up-down.php";
                document.getElementById('two-img').src = "img/UpDown2.gif";
                document.getElementById('three').innerHTML = "Flapping";
                document.getElementById('three-href').href = "flapping.php";
                document.getElementById('three-img').src = "img/flapping2.gif";
                document.getElementById('four').innerHTML = "Rotating";
                document.getElementById('four-href').href = "rotate.php";
                document.getElementById('four-img').src = "img/rotate3.gif";
                document.getElementById('five').innerHTML = "Walking";
                document.getElementById('five-href').href = "#";
                document.getElementById('five-img').src = "img/walking.gif";
                document.getElementById("six-href").style.visibility = "hidden";
                // document.getElementById('six-img').src = "img/front_motion_flap.png";
            }
        }