(function() {
    let piecalUtils = {
        getAlldayMultidayEventEnd: function( event ) {
            if( !event ) return undefined;

            if(event.allDay && event.end) {
                let eventStart = new Date(event.start);
                let comparableEventStart = eventStart.toLocaleDateString('en-us');
                let eventEnd = new Date(event.end);
                let comparableEventEnd = eventEnd.toLocaleDateString('en-us');

                if( comparableEventStart == comparableEventEnd ) return;

                let trueDayNumber = parseInt(event.end.match(/-(\d{2})T/)[1], 10);
                let convertedDayNumber = eventEnd.getDate();
                
                if( convertedDayNumber < trueDayNumber ) {
                    eventEnd.setDate(eventEnd.getDate() + 2);
                } else if( convertedDayNumber == trueDayNumber ) { 
                    eventEnd.setDate(eventEnd.getDate() + 1);
                }

                let extendedEndDate = eventEnd.toISOString();

                return {
                    actualEnd: event.end, // Save original event end to use in popover
                    end: extendedEndDate // Change event end to show it extending through the last day
                }
            }
        },

        getShortenedDayNames: function( dayName, length ) {
            if( !length ) return dayName;

            let allowedLengths = ['full', 'short', 'single'];

            if( !allowedLengths.includes(length) ) {
                return dayName;
            }

            let dayNameMap = {
                // Hebrew
                "יום ראשון": { // Sunday
                    full: "יום ראשון",
                    short: "א׳",
                    single: "א׳"
                },
                "יום שני": { // Monday
                    full: "יום שני",
                    short: "ב׳",
                    single: "ב׳" 
                },
                "יום שלישי": { // Tuesday
                    full: "יום שלישי",
                    short: "ג׳",
                    single: "ג׳"
                },
                "יום רביעי": { // Wednesday
                    full: "יום רביעי",
                    short: "ד׳",
                    single: "ד׳"
                },
                "יום חמישי": { // Thursday
                    full: "יום חמישי",
                    short: "ה׳",
                    single: "ה׳"
                },
                "יום שישי": { // Friday
                    full: "יום שישי",
                    short: "ו׳",
                    single: "ו׳"
                },
                "יום שבת": { // Saturday
                    full: "יום שבת",
                    short: "ש׳",
                    single: "ש׳"
                },
                // Arabic
                "السبت": { // Saturday
                    full: "السبت",
                    short: "س",
                    single: "س"
                },
                "الأحد": { // Sunday
                    full: "الأحد",
                    short: "ح",
                    single: "ح"
                },
                "الاثنين": { // Monday
                    full: "الإثنين",
                    short: "ن",
                    single: "ن"
                },
                "الثلاثاء": { // Tuesday
                    full: "الثلاثاء",
                    short: "ث",
                    single: "ث"
                },
                "الأربعاء": { // Wednesday
                    full: "الأربعاء",
                    short: "ر",
                    single: "ر"
                },
                "الخميس": { // Thursday
                    full: "الخميس",
                    short: "خ",
                    single: "خ"
                },
                "الجمعة": { // Friday
                    full: "الجمعة",
                    short: "ج",
                    single: "ج"
                },
            }

            if (!(dayName in dayNameMap)) {
                switch( length ) {
                    case "full":
                        return dayName;
                    case "short":
                        return dayName.substring(0, 3);
                    case "single":
                        return dayName.substring(0, 1);
                }
            }

            return dayNameMap[dayName][length];
        },

        outputViewersTimezone: function( target ) {
            if( !target ) return;

            let viewerTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            target.innerHTML = viewerTimezone;
        }
    }

    window.piecalUtils = piecalUtils;
})();