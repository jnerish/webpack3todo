<template>
    <div class="helper">
        <span class="left">{{unFinishedTodolength}} items left</span>
        <span class="tabs">
    <span v-for="state in states" 
    :key="state" 
    :class="[state,filter===state ? 'actived':'']" 
    @click="toggleFilter(state)">{{state}}
    </span>
        </span>
        <span class="clear" @click="clearAllCompleted">Clear Completed</span>
    </div>
</template>
<script>
export default {
    props: {
        filter: {
            type: String,
            requirde: true,
        },
        todos: {
            type: Array,
            requirde: true,
        }
    },
    computed: {
        unFinishedTodolength() {
            return this.todos.filter(todo => !todo.completed).length
        }
    },
    data() {
        return {
            states: ['all', 'active', 'completed']
        }
    },
    methods: {
        toggleFilter(state) {
            this.$emit('toggle', state)
        },
        clearAllCompleted() {
            this.$emit('clearAllCompleted')
        }
    }
}
</script>
<style lang="stylus" scoped>
.helper {
    font-weight: 100px;
    dispaly: flex;
    justify-content: space-between;
    padding: 5px 0;
    line-height: 30px;
    background-color: #fff;
    font-size: 14px;
    font-smoothing: antialiased
}

.left,
.clear,
.tabs {
    padding: 0 10px;
    box-sizing: border-box;
}

.left,
.clear {
    width: 150px;
}

.left,
.clear,
.tabs {
    padding: 0 10px;
    box-sizing: border-box;
}

.left,
.clear {
    width: 150px
}

.left {
    text-align: left
}

.clear {
    text-align: right;
    cursor: pointer;
}

.tabs {
    width: 200px;
    dispaly: flex;
    justify-content: space-around;
    * {
        dispaly: inline-block;
        padding: 0 10px;
        cursor: pointer;
        border: 1px solid rgba(175, 47, 47, 0);
        &.actived {
            border-color: rgba(175, 47, 47, 0.4);
            border-radius: 5px;
        }
    }
}
</style>
