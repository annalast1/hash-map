export class HashMap {
    constructor(loadFactor = 0.75, initialCapacity = 16, size = 0) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = size;
    }

    hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        let sum = 0;
        sum = primeNumber * hashCode + key.charCodeAt(i);
        hashCode = sum % this.capacity;
        }

    return hashCode;
    } 

    set(key, value) {

        let index = this.hash(key);
        let place = this.buckets[index];
        
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        } 

        // Check if key is already in map
        for (let entry of place) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }

        place.push({key, value}); 
        this.size++;  
        
        // Check size
        if (this.size / this.capacity >= this.loadFactor) {
            this.grow();
        }        
    }

    get(key) {
        let index = this.hash(key);
        let place = this.buckets;
        // Search for key
        for (const entry of place[index]) {
            if (entry.key === key) {
                return entry.value;
        } 
      }
      return null; 
    }    

    has(key) {
        // Searches hash map for key
        let place = this.buckets
        let index = this.hash(key);
        for (const entry of place[index]) {
            if (entry.key === key) {
                return true;
            } 
        }
        return false;
    }

    remove(key) {
        let place = this.buckets
        let index = this.hash(key);
        // Search for key
        for (let entry of place[index]) {
            if (entry.key === key) {
                place[index].splice(entry, 1);
                this.size--;
                return true;
            } 
        }
        return false;
    }

    length() {
        // Returns number of keys in hash map
        return this.size;
    }

    clear() {
        // Remove all entries
        this.size = 0;
        this.buckets = Array.from({ length: this.capacity }, () => []);
    }

    keys() {
        // Return an array of all keys in map
        let k = [];
        for (const entry of this.buckets) {
            if (entry.length > 0) {
                for (const pair of entry) {
                    k.push(pair.key);
                }
            }
        }
        return (k);
    }

    values() {
        // Return array of all values
        let v = [];
        for (const entry of this.buckets) {
            if (entry.length > 0) {
                for (const pair of entry) {
                    v.push(pair.value);
                }
            }
        }
        console.log(v);
    }

    entries() {
        // Return array of all key, value pairs
        let v = [];
        for (const entry of this.buckets) {
            if (entry.length > 0) {
                for (const pair of entry) {
                    v.push([pair.key, pair.value]);
                }
            }
        }
        return v;
    }

    grow() {
        // get entries
        let pairs = this.entries();
        // double number of buckets
        this.clear();
        this.capacity = this.capacity * 2; 
        this.buckets = Array.from({ length: this.capacity }, () => []);      
        
        // refill map
        for (let i = 0; i < pairs.length; i++) {
            let key = pairs[i][0];
            let value = pairs[i][1];
            this.set(key, value);
        }

        
    }
    
}


 

