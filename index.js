const makeJobs = (jobs, parallelJobsNumber) => {

};

class Parallel {

    parallelJobsNumber = Number.MAX_SAFE_INTEGER;
    jobs = [];

    constructor({ parallelJobs }) {
        this.parallelJobsNumber = parallelJobs;
    };

    job(callback) {
        this.jobs.push(callback);
        return this
    };

    done(callback) {
        makeJobs(this.jobs, this.parallelJobsNumber)
            .then(callback);
    }
}
