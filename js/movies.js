(function () {


    $("#addBtn").click(function () {

            let newTitle = $("#titleInput").val()
            let newGenre = $("#genreInput").val()
            let newRating = parseInt($("#ratingInput").val())


            const newMovie = {
                title: newTitle,
                genre: newGenre,
                rating: newRating
            }
            const url = 'https://tender-soft-bayberry.glitch.me/movies/';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMovie),
            };
            fetch(url, options)
                .then(response => console.log(response)) /* review was created successfully */
                .catch(error => console.error(error)) /* handle errors */
                .finally(function (){
                    $(`#addBtn`).addClass('disabled')
                    setTimeout(function(){
                        window.location.reload();
                    }, 1000);
                })
    })





    fetch('https://tender-soft-bayberry.glitch.me/movies/')
        .then(response => response.json())
        .then(function (data) {
            let movieData = data;
            document.getElementById("movies").innerHTML = renderMovies(movieData);
            document.getElementById("moviesListDD").innerHTML = renderMoviesList(movieData);
            $('#loading').addClass('hidden')

            let searchInput = document.getElementById('searchInput')
            searchInput.addEventListener("keyup", searchBar);
            function searchBar() {
                let filteredMovies = []
                let movieName = searchInput.value.toLowerCase()
                movieData.forEach(function (movie) {
                    if (movie.title.toLowerCase().includes(movieName)) {
                        filteredMovies.push(movie)
                    } else if (movie.genre.toLowerCase().includes(movieName)) {
                        filteredMovies.push(movie)
                    }
                    document.getElementById("movies").innerHTML = renderMovies(filteredMovies);
                    document.getElementById("moviesListDD").innerHTML = renderMoviesList(filteredMovies);
                })
            }

            $('#sortTitle').click(function () {

                movieDataSorted = movieData.sort(
                    (p1, p2) => (p1.title.toLowerCase() > p2.title.toLowerCase()) ? 1 : (p1.title.toLowerCase() < p2.title.toLowerCase()) ? -1 : 0);

                document.getElementById("movies").innerHTML = renderMovies(movieDataSorted);
                document.getElementById("moviesListDD").innerHTML = renderMoviesList(movieDataSorted);

                setTimeout(function(){
                }, 1000);

            })

            $('#sortRating').click(function () {

                movieDataSorted = movieData.sort(
                    (p1, p2) => (p1.rating < p2.rating) ? 1 : (p1.rating > p2.rating) ? -1 : 0);

                document.getElementById("movies").innerHTML = renderMovies(movieDataSorted);
                document.getElementById("moviesListDD").innerHTML = renderMoviesList(movieDataSorted);

                setTimeout(function(){
                }, 1000);

            })

            $('#sortGenre').click(function () {

                movieDataSorted = movieData.sort(
                    (p1, p2) => (p1.genre.toLowerCase() > p2.genre.toLowerCase()) ? 1 : (p1.genre.toLowerCase() < p2.genre.toLowerCase()) ? -1 : 0);

                document.getElementById("movies").innerHTML = renderMovies(movieDataSorted);
                document.getElementById("moviesListDD").innerHTML = renderMoviesList(movieDataSorted);

                setTimeout(function(){
                }, 1000);

            })


            $(`.delete-btn`).click(function () {

                let value=$(this).attr('data-id');

                const url = `https://tender-soft-bayberry.glitch.me/movies/${value}`;
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                fetch(url, options)
                    .then(response => console.log(response)) /* review was created successfully */
                    .catch(error => console.error(error))
                    .finally(function (){
                        $(`.delete-btn`).addClass('disabled')
                        setTimeout(function(){
                            window.location.reload();
                        }, 1000);
                    })


            })


            $("#moviesList").change(function(){
                let value=$("#moviesList option:selected").attr('data-id');
                let index = movieData.findIndex(x => x.id == value);
                console.log(value)
                console.log(index)
                $("#exampleFormControlInput1").val(`${movieData[index].title}`);
                $("#exampleFormControlInput2").val(`${movieData[index].genre}`);
                parseInt($("#exampleFormControlInput3").val(`${movieData[index].rating}`));
            });

            $("#upBtn").click(function () {

                let value=$("#moviesList option:selected").attr('data-id');


                let updatedMovie = {

                    title: $('#exampleFormControlInput1').val(),
                    genre: $('#exampleFormControlInput2').val(),
                    rating: parseInt($('#exampleFormControlInput3').val())
                }


                const url = `https://tender-soft-bayberry.glitch.me/movies/${value}`;
                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(updatedMovie),
                };
                fetch(url, options)
                    .then(response => console.log(response)) /* review was created successfully */
                    .catch(error => console.error(error))
                    .finally(function (){
                        $(`#upBtn`).addClass('disabled')
                        setTimeout(function(){
                            window.location.reload();
                         }, 1000);
                    })


            })
        })

    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(function (data) {
            console.log(data.content)
            document.getElementById("quote").innerHTML = renderQuote(data);
        })

    function renderQuote(data) {
        let html = `<span><i>"${data.content}"</i> - ${data.author}</span>`;
        return html;
    }

     function renderMovies(data) {
        let html = ''
         let start = 0;
        for (let i = 0; i < data.length; i++) {
            start += 1;
            console.log(start)
            // html += '<div class="card col-3" style="width: 16rem; height: 10rem;">'
            // html += '<ul>';
            // html += '<li>Title: ' + data[i].title + '</li>';
            // html += '<li>Genre: ' + data[i].genre + '</li>';
            // html += '<li>Rating: ' + data[i].rating + '</li>';
            // html += '</ul>';
            // html += `<a href="#" data-id="${data[i].id}" id="dltBtn" class="delete-btn btn btn-danger mx-auto mt-auto m-3">Delete</a>\n`
            // html += '</div>'

            html += '<div class="container">'
            if (start === 1) {
                html += '<div>'
            }
            html += '<div class="card">'
            html += '<div class="box">'
            html += '<div class="content">'
            html += '<h2>' + data[i].id + '</h2>'
            html += '<h3>' + data[i].title + '</h3>'
            html += '<p> Genre: ' + data[i].genre + '</p>'
            html += '<p> Rating: ' + data[i].rating + '</p>'
            html += `<a href="#" data-id="${data[i].id}" id="dltBtn" class="delete-btn btn-dark mx-auto mt-auto m-3">Delete</a>\n`
            html += '</div>'
            html += '</div>'
            html += '</div>'
            if (start === 5) {
                html += '</div>';
                start = 0;
            }
            html += '</div>'
        }

        return html;

    }

    function renderMoviesList(data){

        let html = '<select id="moviesList" class="form-select">'
        for (let i = 0; i < data.length; i++) {
            html += `<option value="1" data-id="${data[i].id}">${data[i].title}</option>`;
        }
        html += '</select>'
        


        return html;


    }





})();