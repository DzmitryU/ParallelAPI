class Parallel {
    parallelJobsNumber = Number.MAX_SAFE_INTEGER;
    constructor({ parallelJobs }) {
        this.parallelJobsNumber = parallelJobs;
    };

    job(callback) {
        callback();
        return this
    };

    done(callback) {
        callback();
    }
}
