<template>
    <main>
        <header>
            <h1>正则大全</h1>
            <input
                ref="searchInput"
                v-model="keyword"
                autofocus
                @keyup="search"
                @mouseenter="selectSearchInputText"
                @focus="selectSearchInputText"
                class="search-input"
                placeholder="搜索关键词, 如'手机'"
                type="text"
            >
        </header>

        <article>
            <ul v-if="0 < rules.length" class="list">
                <li
                    @mouseenter="mouseenterHandler(index)"
                    v-for="({title, rule, events}, index) in rules"
                    :key="title"
                    class="row"
                >
                    <i class="border"></i>
                    <h2>{{title}}</h2>
                    <p class="rule">
                        <span :data-clipboard-text="rule" class="btn-copy">复制</span>
                        {{rule}}
                    </p>
                    <section class="verification">
                        <label>
                            <input
                                ref="input"
                                v-model="list[index].value"
                                @blur="check(index, 'blur')"
                                @keyup="check(index, 'keyup')"
                            >
                            <span class="btn-clear" @click="reset(index)">清空</span>
                        </label>

                        <div class="tip">
                            <template v-if="undefined !== list[index].isOk">
                                <p v-if="list[index].isOk" class="success">通过</p>
                                <p v-else class="error">不通过</p>
                            </template>
                        </div>
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
            <p v-else align="center">无数据</p>
        </article>
    </main>
</template>

<script>
import RULES from '@/RULES';
import ClipboardJS from 'clipboard';
export default {
    name: 'app',

    components: {},

    data() {
        Object.freeze(RULES);

        return {
            keyword: '',
            rules:RULES,
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

    mounted() {
        const clipboard = new ClipboardJS('.btn-copy');

        this.$on('hook:destroyed', () => {
            clipboard.destroy();
        });

        clipboard.on('success', ()=> {
            alert('复制成功!');
            // console.info('Action:', e.action);
            // console.info('Text:', e.text);
            // console.info('Trigger:', e.trigger);
            // e.clearSelection();
        });
    },

    methods: {
        search() {
            if ('' !== this.keyword){
                this.rules = this.rules.filter(({ title }) => -1 !== title.indexOf(this.keyword.toLowerCase()));
            } else {
                this.rules = RULES;
            }
        },

        selectSearchInputText() {
            this.$refs.searchInput.select();
        },

        mouseenterHandler(index) {
            this.$refs.input[index].focus();
        },

        reset(index) {
            this.$nextTick(() => {
                this.list[index].value = '';
                this.list[index].isOk = undefined;
            });
        },

        check(index, type) {
            const { events, value } = this.list[index];
            if ('' === value) this.reset(index);
            if (events[type]) {
                const { rule } = this.rules[index];
                const row = this.list[index];
                row.isOk = rule.test(row.value);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$primary: rgb(139, 204, 102);
$radius: 4px;
@keyframes shrinkBorder {
    from {
    }
    50% {
        width: 30px;
        opacity: 0.62;
    }

    to {
        left: 0;
    }
}
main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 1000px;
    margin: auto;
    header {
        padding: 15px;
        > .search-input {
            margin-top: 15px;
            font-size: 16px;
            border: 1px solid #ddd;
            width: 100%;
            padding: 15px;
            border-radius: $radius;
            box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
        }
    }
    ul.list {
        padding: 15px;
        li {
            position: relative;
            overflow: hidden;
            border-radius: $radius;
            margin-bottom: 15px;
            padding: 15px;
            border-color: #eee;
            border-width: 1px;
            border-style: solid;

            > .border {
                position: absolute;
                background: $primary;
                width: 4px;
                height: 100%;
                top: 0;
                left: -4px;
            }
            &:hover {
                background-color: #ddd;
                transition: all 600ms;
                border-radius: $radius;
                border-color: #eee;
                > .border {
                    animation: shrinkBorder 1s;
                    left: 0;
                }
            }
            > p.rule {
                margin-top: 15px;
                padding: 5px 15px;
                background: #eee;
                color: #000;
                border-radius: $radius;
                > .btn-copy {
                    border-radius: $radius;
                    margin-right: 15px;
                    padding: 5px;
                    background: $primary;
                    color: #fff;
                    font-size: 12px;
                    cursor: pointer;

                    &:active {
                        opacity: 0.6;
                        color: #444;
                    }

                    &:hover {
                        opacity: 0.6;
                    }
                }
            }

            > section.verification {
                margin-top: 15px;
                overflow: hidden;
                > label {
                    display: block;
                    > input {
                        width: 40%;
                        padding: 5px 15px;
                        border-radius: $radius;
                        border: 1px solid #ddd;
                        font-size: 16px;
                        & + .btn-clear {
                            padding: 5px;
                            color: #000;
                            display: inline-block;
                        }
                    }
                }
                > .tip {
                    height: 24px;
                    padding: 5px;
                    > p {
                        font-size: 14px;
                        &.success {
                            color: #4caf50;
                        }

                        &.error {
                            color: #ff5722;
                        }
                    }
                }
            }

            > section.trigger {
                display: flex;
                align-items: center;
                align-content: center;
                h3 {
                    font-size: 14px;
                }
                > label {
                    padding: 0 10px;
                }
            }
        }
    }
}
</style>
