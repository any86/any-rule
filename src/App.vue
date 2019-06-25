<template>
    <main>
        <header>
            <h1>正则大全</h1>
        </header>

        <article>
            <ul class="list">
                <li v-for="({title, rule, events}, index) in RULES" :key="title" class="row">
                    <h2>{{title}}</h2>
                    <p class="rule">{{rule}}</p>
                    <section class="verification">
                        <label>
                            <input
                                v-model="list[index].value"
                                @blur="check(index, 'blur')"
                                @keyup="check(index, 'keyup')"
                            >
                        </label>
                        <template v-if="undefined !== list[index].isOk">
                            <span v-if="list[index].isOk" class="success">通过</span>
                            <span v-else class="error">不通过</span>
                        </template>
                    </section>

                    <section class="trigger">
                        <h3>验证时机</h3>
                        <label>
                            <input v-model="list[index].events.blur" type="checkbox"> blur
                        </label>

                        <label>
                            <input v-model="list[index].events.keyup" type="checkbox"> keyup
                        </label>
                    </section>
                </li>
            </ul>
        </article>
    </main>
</template>

<script>
import RULES from '@/RULES';

export default {
    name: 'app',

    components: {},

    data() {
        Object.freeze(RULES);

        return {
            RULES,
            list: RULES.map(() => ({
                value: '',
                isOk: undefined,
                events: {
                    blur: true,
                    keyup: false
                }
            }))
        };
    },

    methods: {
        reset(index) {
            this.list[index].isOk = undefined;
        },

        check(index, type) {
            const { events } = this.list[index];
            if (events[type]) {
                const { rule } = this.RULES[index];
                const row = this.list[index];
                row.isOk = rule.test(row.value);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$radius: 4px;
main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    header {
        padding: 15px;
    }
    ul.list {
        padding:15px;
        li {
            border-radius: $radius;
            margin-top:15px;
            padding: 15px;
            border-color: #eee;
            border-width:1px;
            border-style: solid;
            will-change: auto;
            &:hover{
                transition: box-shadow 500ms, transform 500ms;
                box-shadow: 1px 2px 15px rgba(0,0,0,0.21);
                border-radius: $radius;
                border-color: #eee;
                transform:scale(1.01);
            }
            > p.rule {
                margin-top: 15px;
                padding: 5px 15px;
                background: #eee;
                border-radius: $radius;
            }

            > section.verification {
                margin-top: 15px;
                display: flex;
                overflow: hidden;
                > label {
                    display: block;
                    > input {
                        padding: 5px 15px;
                        border-radius: $radius;
                        border: 1px solid #ddd;
                    }
                    + span {
                        margin-left:5px;
                        &.success {
                            color: #4caf50;
                        }

                        &.error {
                            color: #ff5722;
                        }
                    }
                }
            }


            >section.trigger{
                margin-top: 15px;
                display: flex;
                align-items: center;
                align-content: center;
                h3{font-size: 14px;}
                >label{padding:0 10px;}
            }
        }
    }
}
</style>
