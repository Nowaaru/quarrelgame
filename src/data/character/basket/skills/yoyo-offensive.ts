import { Animation, Skill, Hitbox, Motion, Input, QuarrelAssets, Character } from "@quarrelgame-framework/common";
import yoyoState from "../util/yoyo-state";
import { ReplicatedStorage } from "@rbxts/services";
import YoyoComponent, { YOYO_TYPE } from "shared/components/yoyo.component";
import { Dependency } from "@flamework/core";
import { Components } from "@flamework/components";
import CharactersList from "data/character";
const startupFrames = 18;

export const YoyoOffensive = new Skill.SkillBuilder()
    .SetName("Stop and Go - Offensive")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(startupFrames)
            .SetActive(0)
            .SetRecovery(10)
            .SetContact(0) 
            .SetBlockAdvantage(0)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 0))
                    .SetSize(new Vector3(0, 0, 0))
                    .Construct(),
            )
            .SetEffectAtFrame(startupFrames, (entity, skill) =>
            {
                const yoyoInstance = QuarrelAssets().model.FindFirstChild("yoyo")?.Clone();
                assert(yoyoInstance, "yoyo could not be created (not found?)");

                yoyoInstance.SetAttribute("Owner", entity.attributes.EntityId);
                yoyoInstance.SetAttribute("Direction", entity.instance.GetPivot().LookVector);
                yoyoState.registerYoyo(entity, yoyoInstance as MeshPart);

                yoyoInstance.Parent = entity.instance;

                Dependency<Components>().addComponent<YoyoComponent>(yoyoInstance);
                
            })
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("236S")
                    .SetAnimationId("rbxassetid://132813071138892")
                    .SetPriority(Enum.AnimationPriority.Action)
                    .Construct(),
            ),
    )
    .Construct();

export default YoyoOffensive;
