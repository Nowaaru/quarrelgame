import { Animation, Skill, Hitbox, QuarrelAssets, QGSkill } from "@quarrelgame-framework/common";
import yoyoState from "../util/yoyo-state";
import YoyoComponent from "shared/components/yoyo.component";
import { Dependency } from "@flamework/core";
import { Components } from "@flamework/components";
const startupFrames = 18;

@QGSkill({
    id: "bridget.stopandgoA"
})
export default class YoyoOffensive extends Skill.Skill
{
    Name = "Stop and Go - Offensive";
    GroundedType = Skill.SkillGroundedType.Ground

    FrameData = new Skill.FrameDataBuilder()
            .SetStartup(startupFrames)
            .SetActive(0)
            .SetRecovery(10)
            .SetContact(0) 
            .SetBlockAdvantage(0)
            .SetCondition((entity) => !yoyoState.getYoyo(entity))
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
                yoyoInstance.SetAttribute("Distance", 32);
                yoyoInstance.SetAttribute("Velocity", 16);
                yoyoInstance.SetAttribute("Direction", entity.instance.GetPivot().LookVector);
                yoyoState.registerYoyo(entity, yoyoInstance as MeshPart);

                // TODO: make a place for these kinds of projectiles to go
                yoyoInstance.Parent = entity.instance.Parent;
                Dependency<Components>().addComponent<YoyoComponent>(yoyoInstance).Go();
                
            })
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("236S")
                    .SetAnimationId("rbxassetid://132813071138892")
                    .SetPriority(Enum.AnimationPriority.Action)
                    .Construct(),
            ).Construct()
}
