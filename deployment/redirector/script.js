window.onload = async () => {

    const jobs = await $.get('/data');
    jobs.forEach((job) => {
        $('.job-container').append(`<a target="_blank" href="${job.url}">${job.name}</a><br/>`);
    });

}