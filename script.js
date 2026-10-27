const courseInputs = document.getElementById("courseInputs");
const addbutton = document.getElementById("addCourseButton");
const cgpaResult = document.getElementById("cgpaResult");
const addlist = document.getElementById("courselist");
const calculate = document.getElementById("calculateButton");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.innerText = "☀️";
    } else {
        themeToggle.innerText = "🌙";
    }
});

addbutton.addEventListener("click",function(){ 
    let newRow = document.createElement("div");
newRow.className = "course-row";
newRow.innerHTML = `<input type="text" class="courseCode" placeholder="coursecode"> `;
newRow.innerHTML += `<input type="number" class="unit" placeholder="no of unit">`;
newRow.innerHTML += `<select class="grade">
<option value="5">A</option>
<option value="4">B</option>
<option value="3">C</option>
<option value="2">D</option>
<option value="1">E</option>
<option value="0">F</option>
</select>`;
newRow.innerHTML += `<button type="button" class="removeCourseButton">Remove</button>`;
 courseInputs.appendChild(newRow);
})

function calculateCGPA(){ 
    let totalUnits = 0;
let totalGradePoints = 0;

for (let course of courses) {
    totalUnits = totalUnits + course.unit;
    totalGradePoints = totalGradePoints + (course.unit * course.grade);

};
  let cgpa = totalGradePoints / totalUnits;
return cgpa;}

function getLetterGrade(gradePoint){
    if (gradePoint === 5){
        return "A";
    }
    else if (gradePoint === 4){
        return "B";
    }
    else if (gradePoint === 3){
        return "C";
    }
    else if (gradePoint === 2){
        return "D";
    }
    else if (gradePoint === 1){
        return "E";
    }
    else{
        return "F";
    }
}
courseInputs.addEventListener("click", function(event) {
    if (event.target.classList.contains("removeCourseButton")) {
        event.target.parentElement.remove();
    }
});
let courses = [];
calculate.addEventListener("click", function(){
    courses = [];
const rows = courseInputs.querySelectorAll(".course-row");
for (let row of rows){
    const courseCode = row.querySelector(".courseCode");
    const unit = row.querySelector(".unit").value;
    const grade = row.querySelector(".grade").value;
    let normalizeCode = courseCode.value.toUpperCase();
    let course = {
    courseCode : normalizeCode,
    unit : Number(unit),
    grade:Number(grade)
}
if (courseCode.value === "" || unit === "" || unit <= 0 || grade === ""){
    cgpaResult.innerHTML = "Please fill in all fields for each course.";
    return;
}
 let duplicate = courses.some(function(course) {
        return normalizeCode === course.courseCode.toUpperCase();
});
        if (duplicate){
            cgpaResult.innerHTML = "Duplicate course code found. Please use unique course codes.";
            return;
        }
courses.push(course);
} 
let cgpa = calculateCGPA();
cgpaResult.innerHTML =cgpa.toFixed(2)
 });
