const splitArray = (array, chunkSize) => {
    const chunks = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize))
    }

    return chunks;
};

const promisifyJobs = (jobs) => {
    const promisifiedJobs = [];

    jobs.forEach((job) => {
        promisifiedJobs.push(
            new Promise((resolve) => {
                job(resolve);
            })
        )
    });

    return promisifiedJobs;
};

const makeJobs = (jobs, parallelJobsNumber) => {
    const jobChunks = splitArray(jobs, parallelJobsNumber);

    let promiseChain = Promise.all([Promise.resolve()]);

    jobChunks.forEach((chunk) => {
        const promisifiedJobs = promisifyJobs(chunk);
        promiseChain = promiseChain.then(Promise.all(promisifiedJobs));
    });

    return promiseChain;
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
