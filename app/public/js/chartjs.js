
var success_chart = document.getElementById('success_chart');
var My_success_chart = new Chart(success_chart, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'نمودار خرید',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'orange',
            borderWidth: 1  ,
            tension: .5
            
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        fill: true,
        borderColor: 'black',
    }
});



var primary_chart = document.getElementById('primary_chart');
var My_primary_chart = new Chart(primary_chart, {
    type: 'bar',
    data: {

        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'],
        datasets: [{

            label: 'نمودار فروش',
            data: [65, 59, 10, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1  ,
            pointBorderColor: '#fff',
        }]
    },
    options: {
        indexAxis: 'y',
    }
});

const data = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
    ],
}




var xValues = ["شنبه", "یک شنبه", "دو شنبه", "سه شنبه", "چهار شنبه", "پنج شنبه", "جمعه"];
var yValues = [55, 49, 44, 24, 15, 60, 71];
var barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145",
    "#2b5797",
    "#e8c3b9",
];
var Chart3 = document.getElementById('Three_chart');
var My_Three_chart = new Chart(Chart3, {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues,
            label: 'سودسهام',
        }]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: "World Wine Production 2018"
        }
    }
})

var xoValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

var Four_chart = document.getElementById('Four_chart');
var My_Four_chart = new Chart(Four_chart, {
    type: "line",
    data: {
        labels: 'xoValues',
        datasets: [{
            label: 'تصحیلات',
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: "red",
            fill: true,
            tension: .5
        }, {
            label: 'مناقصه',
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: "green",
            fill: true,
            tension: .5
        }, {
            label: 'کارشناسی شده',
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: "blue",
            fill: true,
            tension: .5
        }]
    },
    options: {
        legend: { display: true }
    }
})


// var Full_chart = document.getElementById('Full_chart');
// var My_Full_chart = new Chart(Full_chart, {
//     type: "line",
//     data: {
//         labels: xoValues,
//         datasets: [{
//             label: 'اصلی',
//             data: [0, 59, 80, 81, 56, 55, 60, 65, 55, 80],
//             borderColor: "#555",
//             fill: false,
//             pointBorderColor: "#333",
//             backgroundColor: "rgba(0,0,0,.5)",
//             borderWidth: 1  ,
//             fill: true,
//             tension: .5
//         }]
//     },
//     options: {
//         legend: { display: false },
//         fill: true,
//     }
// })