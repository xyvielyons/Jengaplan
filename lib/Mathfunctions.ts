export const getTotalWeeks = (startWeek:Number,endWeek:Number)=>{
    let total = 0;
    for (let index:any = startWeek; index <= endWeek; index++) {
        total++
        
    }
    return total
}


export const getTotalLessons = (
    startWeek:any,
    endWeek:any,
    startLesson:any,
    endLesson:any,
    lessonsPerWeek:any,
    breaks:any,
    addBreaks:any,
    doubleLesson: number[] // Array of double lesson blocks
)=>{
  // Calculate total lessons in the term before accounting for breaks
  let totalLessons = 0;

  // Loop through each week in the term
  for (let week = startWeek; week <= endWeek; week++) {
    let weekStartLesson = week === startWeek ? startLesson : 1; // Starting lesson for the week
    let weekEndLesson = week === endWeek ? endLesson : lessonsPerWeek; // Ending lesson for the week

    // Ensure valid range of lessons
    if (weekStartLesson > weekEndLesson) continue;

    let weekTotalLessons = 0;

    // Loop through lessons and check for double lessons
    for (let lesson = weekStartLesson; lesson <= weekEndLesson; lesson++) {
      // Check if the lesson is part of a double lesson block
      if (doubleLesson.includes(lesson)) {
        // If we encounter a double lesson, we count it as 1 lesson
        weekTotalLessons += 1;
        // Skip the next lesson (as it's part of the double lesson)
        lesson++;
      } else {
        weekTotalLessons += 1;
      }
    }

    // Add total lessons for this week to the overall total
    totalLessons += weekTotalLessons;
  }

  // Subtract lessons lost to breaks if breaks are enabled
  if (addBreaks) {
    breaks.forEach((breakPeriod: any) => {
      const {
        startWeek: breakStartWeek,
        startLesson: breakStartLesson,
        endWeek: breakEndWeek,
        endLesson: breakEndLesson,
      } = breakPeriod;

      // Iterate through break weeks and calculate lessons lost
      for (let week = breakStartWeek; week <= breakEndWeek; week++) {
        let weekStartLesson = week === breakStartWeek ? breakStartLesson : 1;
        let weekEndLesson = week === breakEndWeek ? breakEndLesson : lessonsPerWeek;

        // Adjust for overlaps with the term
        if (week < startWeek || week > endWeek) continue;

        weekStartLesson = Math.max(weekStartLesson, week === startWeek ? startLesson : 1);
        weekEndLesson = Math.min(weekEndLesson, week === endWeek ? endLesson : lessonsPerWeek);

        // Subtract lessons lost during breaks
        for (let lesson = weekStartLesson; lesson <= weekEndLesson; lesson++) {
          // If the lesson is part of a double lesson block, subtract it as 1 lesson
          if (doubleLesson.includes(lesson)) {
            totalLessons -= 1; // Subtract 1 lesson for double lessons
            lesson++; // Skip the next lesson as it's part of the double lesson block
          } else {
            totalLessons -= 1;
          }
        }
      }
    });
  }

  return totalLessons > 0 ? totalLessons : 0; // Ensure non-negative result

}


