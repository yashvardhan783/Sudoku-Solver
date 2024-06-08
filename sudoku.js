
"use strict";

var TESTABLE=false;
var SudokuSolver=function(testable){
    var solver;

    function solve(boardString){
        var boardArray=boardString.split("");
        if(isInvalid(boardArray)){
            return false;
        }
        return recursiveSolve(boardString);
    }
    function solveAndPrint(boardString) {
        var solvedBoard = solve(boardString);
        console.log(toString(solvedBoard.split("")));
        return solvedBoard;
      }

    function recursiveSolve(boardString){
        var boardArray=boardString.split("");
        if(boardIsSolved(boardArray)){
            return boardArray.join("");
        }
        var cellpossibilities=getNextCellAndPossibilities(boardArray);
        var nextUnsolvedCellIndex=cellpossibilities.index;
        var possibilities=cellpossibilities.choics;
        for(var i =0;i<possibilities.length;i++){
            boardArray[nextUnsolvedCellIndex]=possibilities[i];
            var solvedBoard=recursiveSolve(boardArray.join(""));
            if(solvedBoard){
                return solvedBoard;
            }
        }
        return false;
    }
    function boardIsSolved(boardArray){
        for(var i=0;i<boardArray.length;i++){
            if(boardArray[i]==="-"){
                return false;
            }
        }
        return true;
    }
    function isInvalid(boardArray){
        return !boardIsValid(boardArray);
    }

    function boardIsValid(boardArray) {
        return allRowsValid(boardArray) && allColumnsValid(boardArray) && allBoxesValid(boardArray);
      }

    function allRowsValid(boardArray) {
        return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
          return getRow(boardArray, i);
        }).reduce(function (validity, row) {
          return collectionIsValid(row) && validity;
        }, true);
      }
    
      function allBoxesValid(boardArray) {
        return [0, 3, 6, 27, 30, 33, 54, 57, 60].map(function (i) {
          return getBox(boardArray, i);
        }).reduce(function (validity, row) {
          return collectionIsValid(row) && validity;
        }, true);
      }
      function allColumnsValid(boardArray) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
          return getColumn(boardArray, i);
        }).reduce(function (validity, row) {
          return collectionIsValid(row) && validity;
        }, true);
      }

      function getAllIntersection(boardArray, i) {
        return getRow(boardArray, i).concat(getColumn(boardArray, i)).concat(getBox(boardArray, i));
    }
      function getRow(boardArray, i) {
        var startingEl = Math.floor(i / 9) * 9;
        return boardArray.slice(startingEl, startingEl + 9);
    }
    function getColumn(boardArray, i) {
        var startingEl = Math.floor(i % 9);
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (num) {
          return boardArray[startingEl + num * 9];
        });
    }
    function getBox(boardArray, i) {
        var boxCol = Math.floor(i / 3) % 3;
        var boxRow = Math.floor(i / 27);
        var startingIndex = boxCol * 3 + boxRow * 27;
        return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(function (num) {
          return boardArray[startingIndex + num];
        });
      }
  
      function getNextCellAndPossibilities(boardArray){
        for(var i=0;i<boardArray.length;i++){
            if(boardArray[i]==="-"){
                var existingvalue=getAllIntersection(boardArray,i);
                var choice=["1","2","3","4","5","6","7","8","9"].filter(function(num){
                    return existingvalue.indexOf(num)<0;
                });
            return{ index:i,choics:choice};
            }
        }
    }


   

     
      function collectionIsValid(collection){
        var numCounts={};
        for(var i=0;i<collection.length;i++){
            if(collection[i]!="-"){
                if(numCounts[collection[i]]===undefined){
                    numCounts[collection[i]]=1;
                }
                else{
                    return false;
                }
            }
            }
        return true;
      }

    
  function toString(boardArray) {
    return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
      return getRow(boardArray, i).join(" ");
    }).join("\n");
  }

    solver = { 
      solve: solve,
      solveAndPrint: solveAndPrint,
      recursiveSolve: recursiveSolve,
      isInvalid: isInvalid,
      boardIsValid: boardIsValid,
      boardIsSolved: boardIsSolved,
      getNextCellAndPossibilities: getNextCellAndPossibilities,
      getAllIntersection: getAllIntersection,
      allRowsValid: allRowsValid,
      getRow: getRow,
      allColumnsValid: allColumnsValid,
      getColumn: getColumn,
      allBoxesValid: allBoxesValid,
      getBox: getBox,
      collectionIsValid: collectionIsValid,
      toString: toString };
  
  return solver;

}(TESTABLE);