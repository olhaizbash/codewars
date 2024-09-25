// Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

// Example:

// Given an input string of:

// apples, pears # and bananas
// grapes
// bananas !apples
// The output expected would be:

// apples, pears
// grapes
// bananas
// The code would be called like so:

// var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"

function solution(text, markers) {
  if (markers.length === 0) {
    return text;
  }
  return text
    .split("\n")
    .map((line) => {
      for (let marker of markers) {
        if (line.includes(marker)) {
          line = line.split(marker)[0];

          break;
        }
      }

      return line.trimEnd();
    })
    .join("\n");
}

//    Видає дві помилки, не можу зрозуміти в чому причина, чат GPT теж замучила, він не знає:))))))))

//    Test Results:
// Sample Tests
// text = "aa bb cc", markers = []
// text = "aa bb cc  ", markers = []
// expected 'aa bb cc  ' to equal 'aa bb cc' !!!!!!!!
// Completed in 1ms
// text = "  aa bb cc", markers = []
// text = "  aa # bb # cc  ", markers = []
// expected '  aa # bb # cc  ' to equal '  aa # bb # cc' !!!!!!!!
// text = "aa bb cc", markers = ["#"]
// text = "aa bb # cc", markers = ["#"]
// text = "aa# bb cc", markers = ["#"]
// text = "aa #bb cc", markers = ["#"]
// text = "aa # bb # cc", markers = ["#"]
// text = "#aa bb cc", markers = ["#"]
// text = "#aa bb\ncc dd", markers = ["#"]
// text = "aa # bb\ncc dd", markers = ["#"]
// text = "aa bb\n#cc dd", markers = ["#"]
// text = "aa bb\ncc # dd", markers = ["#"]
// text = "aa bb\ncc dd#", markers = ["#"]
// text = "aa bb\ncc dd", markers = ["#","!"]
// text = "aa # bb\ncc dd", markers = ["#","!"]
// text = "aa bb\ncc ! dd", markers = ["#","!"]
// text = "#aa bb\n!cc dd", markers = ["#","!"]
// text = "aa ! bb\ncc # dd", markers = ["#","!"]
// text = "aa bb#\ncc dd!", markers = ["#","!"]
// text = "aa + bb\ncc - dd\nee * ff", markers = ["+","-","*"]
// text = "aa / bb\ncc ^ dd\nee $ ff", markers = ["/","^","$"]
// Completed in 4ms
